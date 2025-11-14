'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import {
  generateCalendarGrid,
  MONTH_NAMES,
  DAY_NAMES,
  formatDateToString,
  isPastDate,
  isToday,
  isSameDay,
  isDateOccupied,
  fetchOccupiedDates,
  addOccupiedDate,
  removeOccupiedDate
} from '@/lib/calendarUtils'

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [occupiedDates, setOccupiedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({ type: '', message: '' })

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Fetch occupied dates on component mount
  useEffect(() => {
    loadOccupiedDates()
  }, [])

  const loadOccupiedDates = async () => {
    try {
      setLoading(true)
      const dates = await fetchOccupiedDates()
      setOccupiedDates(dates)
    } catch (error) {
      console.error('Failed to load occupied dates:', error)
      if (error.message.includes('Database table not found')) {
        showNotificationMessage('error', 'Database not set up. Please run the SQL script in Supabase first.')
      } else {
        showNotificationMessage('error', `Failed to load dates: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const showNotificationMessage = (type, message) => {
    setNotification({ type, message })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
    setSelectedDate(null)
  }

  const handleDateClick = (date) => {
    if (!date || isPastDate(date)) return
    setSelectedDate(date)
  }

  const toggleOccupiedDate = async (date) => {
    if (!date || isPastDate(date)) return

    try {
      const isOccupied = isDateOccupied(date, occupiedDates)
      
      if (isOccupied) {
        await removeOccupiedDate(date)
        setOccupiedDates(prev => prev.filter(d => d.date !== formatDateToString(date)))
        showNotificationMessage('success', 'Date marked as available')
      } else {
        await addOccupiedDate(date)
        const newOccupiedDate = { 
          date: formatDateToString(date), 
          id: Date.now().toString() // Temporary ID
        }
        setOccupiedDates(prev => [...prev, newOccupiedDate])
        showNotificationMessage('success', 'Date marked as occupied')
      }
      
      setSelectedDate(null)
    } catch (error) {
      showNotificationMessage('error', error.message)
    }
  }

  const getDateClass = (date) => {
    if (!date) return ''
    
    let classes = 'w-10 h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200 '
    
    if (isPastDate(date)) {
      classes += 'text-gray-300 cursor-not-allowed '
    } else if (isDateOccupied(date, occupiedDates)) {
      classes += 'bg-red-100 text-red-800 border-2 border-red-300 hover:bg-red-200 '
    } else if (isToday(date)) {
      classes += 'bg-blue-100 text-blue-800 border-2 border-blue-300 hover:bg-blue-200 '
    } else {
      classes += 'bg-green-50 text-green-800 border-2 border-green-200 hover:bg-green-100 '
    }
    
    if (selectedDate && isSameDay(date, selectedDate)) {
      classes += 'ring-2 ring-amber-500 ring-offset-2 '
    }
    
    return classes
  }

  const calendarGrid = generateCalendarGrid(currentYear, currentMonth)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-gray-900">Date Management</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-600 font-medium">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-gray-600 font-medium">Occupied</span>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h4 className="text-lg font-semibold text-gray-900">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h4>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAY_NAMES.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarGrid.map((date, index) => (
            <div key={index} className="flex justify-center">
              {date ? (
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isPastDate(date)}
                  className={getDateClass(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-10 h-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Actions */}
      {selectedDate && !isPastDate(selectedDate) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4 border-l-4 border-amber-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Currently: {isDateOccupied(selectedDate, occupiedDates) ? 'Occupied' : 'Available'}
              </p>
            </div>
            <button
              onClick={() => toggleOccupiedDate(selectedDate)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDateOccupied(selectedDate, occupiedDates)
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isDateOccupied(selectedDate, occupiedDates) ? (
                <>
                  <Minus className="w-4 h-4" />
                  <span>Mark Available</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Mark Occupied</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Instructions:</p>
            <ul className="text-sm text-blue-800 mt-1 space-y-1 font-medium">
              <li>• Click on any future date to select it</li>
              <li>• Green dates are available for booking</li>
              <li>• Red dates are marked as occupied</li>
              <li>• Use the buttons to mark dates as occupied or available</li>
              <li>• Past dates cannot be modified</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">{notification.message}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AdminCalendar
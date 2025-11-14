import ProtectedAdminDashboard from '@/components/ProtectedAdminDashboard'

export default function AdminPage() {
  return <ProtectedAdminDashboard />
}

export const metadata = {
  title: 'Admin Dashboard - TVS Event Center',
  description: 'Manage contact form submissions and track inquiries',
}
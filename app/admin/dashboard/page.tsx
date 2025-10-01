'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  MessageCircle,
  LogOut,
  CheckCircle,
  Clock,
  Package,
  XCircle,
  AlertCircle
} from 'lucide-react'

// Import types separately to avoid initialization issues
import type { Order, Ticket } from '@/lib/supabase'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    todaySales: 0,
    todayOrders: 0,
    openTickets: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'orders' | 'tickets'>('orders')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchData()
    }
  }, [status, router])

  async function fetchData() {
    try {
      // Dynamically import supabase to ensure env vars are loaded
      const { supabase } = await import('@/lib/supabase')
      
      if (!supabase) {
        setError('Supabase client not initialized. Check environment variables.')
        setLoading(false)
        return
      }

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (ordersError) {
        console.error('Orders error:', ordersError)
        setError('Fehler beim Laden der Bestellungen')
      } else if (ordersData) {
        setOrders(ordersData)
        calculateStats(ordersData, tickets)
      }

      // Fetch tickets
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (ticketsError) {
        console.error('Tickets error:', ticketsError)
      } else if (ticketsData) {
        setTickets(ticketsData)
        calculateStats(ordersData || [], ticketsData)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Fehler beim Laden der Daten')
      setLoading(false)
    }
  }

  function calculateStats(ordersData: Order[], ticketsData: Ticket[]) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const totalSales = ordersData
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + parseFloat(o.amount.toString()), 0)

    const todayOrders = ordersData.filter(o => 
      new Date(o.created_at) >= today
    )

    const todaySales = todayOrders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + parseFloat(o.amount.toString()), 0)

    setStats({
      totalSales,
      totalOrders: ordersData.length,
      todaySales,
      todayOrders: todayOrders.length,
      openTickets: ticketsData.filter(t => t.status === 'open').length
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'open':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
      case 'closed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
      case 'open':
        return <Clock className="w-4 h-4" />
      case 'processing':
      case 'in_progress':
        return <Package className="w-4 h-4" />
      case 'failed':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center">
        <div className="text-white text-xl">Laden...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Konfigurationsfehler</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Überprüfe deine .env.local Datei und starte den Server neu.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hypex Dashboard</h1>
              <p className="text-sm text-gray-600">Willkommen zurück, Admin</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Heute Umsatz</h3>
            <p className="text-3xl font-bold text-gray-900">€{stats.todaySales.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.todayOrders} Bestellungen</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Gesamt Bestellungen</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            <p className="text-xs text-gray-500 mt-1">Alle Zeit</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Gesamt Umsatz</h3>
            <p className="text-3xl font-bold text-gray-900">€{stats.totalSales.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Alle Zeit</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Offene Tickets</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.openTickets}</p>
            <p className="text-xs text-gray-500 mt-1">Benötigen Antwort</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'orders'
                    ? 'border-[#ed07f6] text-[#ed07f6]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Bestellungen ({orders.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'tickets'
                    ? 'border-[#ed07f6] text-[#ed07f6]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Support Tickets ({tickets.length})</span>
                </div>
              </button>
            </div>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Bestell-ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Kunde</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Produkt</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Betrag</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
                          Noch keine Bestellungen vorhanden
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm text-gray-900">{order.order_id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{order.customer_name || 'N/A'}</p>
                              <p className="text-sm text-gray-500">{order.customer_email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">{order.product_name}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-gray-900">€{order.amount.toFixed(2)}</span>
                            <p className="text-xs text-gray-500">{order.payment_method}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString('de-DE')}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ticket-ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Kunde</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Betreff</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priorität</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
                          Noch keine Support Tickets vorhanden
                        </td>
                      </tr>
                    ) : (
                      tickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm text-gray-900">{ticket.ticket_id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{ticket.customer_name}</p>
                              <p className="text-sm text-gray-500">{ticket.customer_email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">{ticket.subject}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                              ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              ticket.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              <span className="capitalize">{ticket.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-600">
                              {new Date(ticket.created_at).toLocaleDateString('de-DE')}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
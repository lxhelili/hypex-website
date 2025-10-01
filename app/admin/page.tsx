'use client'

import { useState } from 'react'
import { ShoppingCart, Users, TrendingUp, DollarSign, Package, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('today')

  // Mock data - Replace with real data from your database
  const stats = {
    today: {
      sales: 2450.00,
      orders: 15,
      customers: 12,
      conversion: 3.2
    },
    week: {
      sales: 15680.00,
      orders: 89,
      customers: 67,
      conversion: 3.5
    },
    month: {
      sales: 58920.00,
      orders: 342,
      customers: 256,
      conversion: 3.8
    }
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Max Mustermann',
      email: 'max@example.com',
      product: 'Instagram Follower - 5.000',
      amount: 14.99,
      status: 'completed',
      date: '2025-09-29 14:23',
      paymentMethod: 'Stripe'
    },
    {
      id: 'ORD-002',
      customer: 'Anna Schmidt',
      email: 'anna@example.com',
      product: 'Spotify Premium - 12 Monate',
      amount: 39.99,
      status: 'pending',
      date: '2025-09-29 13:45',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-003',
      customer: 'Tom Weber',
      email: 'tom@example.com',
      product: 'TikTok Follower - 10.000',
      amount: 27.99,
      status: 'completed',
      date: '2025-09-29 12:10',
      paymentMethod: 'Stripe'
    },
    {
      id: 'ORD-004',
      customer: 'Lisa Müller',
      email: 'lisa@example.com',
      product: 'Google Maps Bewertungen - 10',
      amount: 49.99,
      status: 'processing',
      date: '2025-09-29 11:30',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-005',
      customer: 'Peter Klein',
      email: 'peter@example.com',
      product: 'YouTube Premium - 12 Monate',
      amount: 42.99,
      status: 'completed',
      date: '2025-09-29 10:15',
      paymentMethod: 'Stripe'
    }
  ]

  const topProducts = [
    { name: 'Instagram Follower', sales: 45, revenue: 674.55 },
    { name: 'Spotify Premium', sales: 32, revenue: 1279.68 },
    { name: 'TikTok Follower', sales: 28, revenue: 783.72 },
    { name: 'YouTube Premium', sales: 18, revenue: 773.82 },
    { name: 'Google Maps Reviews', sales: 12, revenue: 599.88 }
  ]

  const currentStats = stats[timeRange as keyof typeof stats]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
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
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'processing':
        return <Package className="w-4 h-4" />
      case 'failed':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-purple-200">Übersicht deiner Verkäufe und Bestellungen</p>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6 flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? 'bg-[#ed07f6] text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {range === 'today' ? 'Heute' : range === 'week' ? 'Diese Woche' : 'Dieser Monat'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12.5%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Umsatz</h3>
            <p className="text-3xl font-bold text-gray-900">{currentStats.sales.toFixed(2)}€</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Bestellungen</h3>
            <p className="text-3xl font-bold text-gray-900">{currentStats.orders}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-purple-600 text-sm font-semibold">+15.3%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Kunden</h3>
            <p className="text-3xl font-bold text-gray-900">{currentStats.customers}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-pink-600 text-sm font-semibold">+2.1%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Conversion Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{currentStats.conversion}%</p>
          </div>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Letzte Bestellungen</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Kunde</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Produkt</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Betrag</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-900">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{order.product}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900">{order.amount.toFixed(2)}€</span>
                        <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Produkte</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} Verkäufe</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#8924e9]">{product.revenue.toFixed(2)}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">📊 Dashboard-Integration</h3>
          <p className="text-purple-200 mb-4">
            Dies ist ein Demo-Dashboard. Für ein vollständiges Admin-Panel benötigst du:
          </p>
          <ul className="space-y-2 text-purple-200">
            <li>• <strong>Datenbank:</strong> PostgreSQL, MongoDB oder Firebase für Bestelldaten</li>
            <li>• <strong>Backend-API:</strong> Next.js API Routes oder separates Backend</li>
            <li>• <strong>Authentifizierung:</strong> NextAuth.js für Admin-Login</li>
            <li>• <strong>Webhook-Processing:</strong> Stripe & PayPal Webhooks speichern Bestellungen</li>
            <li>• <strong>Email-Service:</strong> SendGrid oder Resend für Bestellbestätigungen</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
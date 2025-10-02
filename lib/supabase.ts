import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

// Client for browser/frontend (uses anon key)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Admin client for server-side operations (uses service role key)  
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Types for your database
export interface Order {
  id: string
  order_id: string
  customer_name: string | null
  customer_email: string
  product_name: string
  product_type: string | null
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'processing' | 'failed' | 'refunded'
  payment_method: string | null
  payment_intent_id: string | null
  metadata: any
  created_at: string
  updated_at: string
}

export interface Ticket {
  id: string
  ticket_id: string
  customer_name: string
  customer_email: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  order_id: string | null
  created_at: string
  updated_at: string
}

export interface TicketReply {
  id: string
  ticket_id: string
  reply_from: 'customer' | 'admin'
  message: string
  created_at: string
}
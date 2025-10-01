import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message, order_id } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    // Generate unique ticket ID
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase()
    const ticketId = `TKT-${timestamp}-${randomStr}`

    // Insert ticket into database
    const { data, error } = await supabaseAdmin
      .from('tickets')
      .insert({
        ticket_id: ticketId,
        customer_name: name,
        customer_email: email,
        subject,
        message,
        order_id: order_id || null,
        status: 'open',
        priority: 'normal'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating ticket:', error)
      return NextResponse.json(
        { error: 'Fehler beim Erstellen des Tickets' },
        { status: 500 }
      )
    }

    console.log('Ticket created successfully:', ticketId)

    // TODO: Send confirmation email to customer
    // TODO: Send notification email to admin

    return NextResponse.json({
      success: true,
      ticket_id: ticketId,
      message: 'Ticket erfolgreich erstellt'
    })

  } catch (error) {
    console.error('Error in ticket creation:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amountInCents, customerEmail, customerName, customerPhone } = body

    if (!amountInCents || amountInCents < 1000) {
      return NextResponse.json(
        { error: "Monto inválido" },
        { status: 400 }
      )
    }

    // Referencia única
    const reference = `MODA-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    const currency = "COP"
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET || ""

    // Firma de integridad (obligatoria)
    const concatenated = `${reference}${amountInCents}${currency}${integritySecret}`
    const integrity = crypto
      .createHash("sha256")
      .update(concatenated)
      .digest("hex")

    return NextResponse.json({
      publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      currency,
      amountInCents,
      reference,
      integrity,
      customerData: {
        email: customerEmail,
        fullName: customerName,
        phoneNumber: customerPhone,
        phoneNumberPrefix: "+57",
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al crear el pago" },
      { status: 500 }
    )
  }
}
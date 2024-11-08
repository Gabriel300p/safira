import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  const tutors = await db.tutor.findMany({
    where: {
      id: {
        not: 2, // Excluding tutor with id 2
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      cep: true,
      cidade: true,
      estado: true,
      bairro: true,
      complemento: true,
      numero: true,
      observacao: true,
      criadoEm: true,
      atualizadoEm: true,
      Animal: {
        select: {
          id: true,
          nome: true,
          tipo: true,
          raca: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
    orderBy: {
      atualizadoEm: "desc",
    },
  });

  return new Response(JSON.stringify(tutors), { status: 200 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const updateData = {
      ...(body.nome && { nome: body.nome }),
      ...(body.email && { email: body.email }),
      ...(body.telefone && { telefone: body.telefone }),
      ...(body.cep && { cep: body.cep }),
      ...(body.cidade && { cidade: body.cidade }),
      ...(body.estado && { estado: body.estado }),
      ...(body.bairro && { bairro: body.bairro }),
      ...(body.complemento && { complemento: body.complemento }),
      ...(body.numero && { numero: body.numero }),
      ...(body.observacao && { observacao: body.observacao }),
    };

    const updatedTutor = await db.tutor.update({
      where: {
        id: body.id,
      },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedTutor), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar tutor:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar tutor." }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const deletedTutor = await db.tutor.delete({
      where: {
        id: body.id,
      },
    });
    return new Response(JSON.stringify(deletedTutor), { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir tutor:", error);
    return new Response(JSON.stringify({ error: "Erro ao excluir tutor." }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const newTutor = await db.tutor.create({
      data: {
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        cep: body.cep,
        cidade: body.cidade,
        estado: body.estado,
        bairro: body.bairro,
        complemento: body.complemento,
        numero: body.numero,
        observacao: body.observacao,
        usuario: {
          connect: {
            id: Number(session.user.id),
          },
        },
      },
    });
    return new Response(JSON.stringify(newTutor), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tutor:", error);
    return new Response(JSON.stringify({ error: "Erro ao criar tutor." }), {
      status: 500,
    });
  }
}

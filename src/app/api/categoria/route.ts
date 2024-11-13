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

  const categorias = await db.categoria.findMany({
    select: {
      id: true,
      nome: true,
      tipo: true,
      observacao: true,
      criadoEm: true,
      atualizadoEm: true,
      Financeiro: {
        select: {
          id: true,
          valor: true,
        },
      },
    },
    orderBy: { atualizadoEm: "desc" },
  });

  return new Response(JSON.stringify(categorias), { status: 200 });
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
      ...(body.tipo && { tipo: body.tipo }),
      ...(body.observacao && { telefone: body.observacao }),
    };

    const updatedCategoria = await db.categoria.update({
      where: {
        id: body.id,
      },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedCategoria), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar categoria." }),
      {
        status: 500,
      }
    );
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
    const deletedCategoria = await db.categoria.delete({
      where: {
        id: body.id,
      },
    });
    return new Response(JSON.stringify(deletedCategoria), { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao excluir categoria." }),
      {
        status: 500,
      }
    );
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

    const newCategoria = await db.categoria.create({
      data: {
        nome: body.nome,
        tipo: body.tipo,
        observacao: body.observacao,
        usuario: {
          connect: {
            id: Number(session.user.id),
          },
        },
      },
    });
    return new Response(JSON.stringify(newCategoria), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return new Response(JSON.stringify({ error: "Erro ao criar categoria." }), {
      status: 500,
    });
  }
}

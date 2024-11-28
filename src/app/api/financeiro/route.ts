import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

// Função para buscar todos os registros financeiros
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  const financeiro = await db.financeiro.findMany({
    select: {
      id: true,
      nome: true,
      valor: true,
      recorrencia: true,
      tipo: true,
      observacao: true,
      data: true,
      categoria: {
        select: {
          id: true,
          nome: true,
        },
      },
      criadoEm: true,
      atualizadoEm: true,
    },
    orderBy: {
      atualizadoEm: "desc",
    },
  });

  return new Response(JSON.stringify(financeiro), { status: 200 });
}

// Função para atualizar um registro financeiro
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
      ...(body.valor !== undefined && { valor: body.valor }),
      ...(body.recorrencia && { recorrencia: body.recorrencia }),
      ...(body.tipo && { tipo: body.tipo }),
      ...(body.observacao && { observacao: body.observacao }),
      ...(body.data && { data: new Date(body.data) }),
      ...(body.categoriaId && { categoriaId: body.categoriaId }),
    };

    const financeiro = await db.financeiro.update({
      where: { id: body.id },
      data: updateData,
    });

    return new Response(JSON.stringify(financeiro), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar financeiro:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar financeiro." }),
      {
        status: 500,
      }
    );
  }
}

// Função para deletar um registro financeiro
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const financeiro = await db.financeiro.delete({
      where: { id: body.id },
    });

    return new Response(JSON.stringify(financeiro), { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir financeiro:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao excluir financeiro." }),
      {
        status: 500,
      }
    );
  }
}

// Função para criar um novo registro financeiro
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const financeiro = await db.financeiro.create({
      data: {
        nome: body.nome,
        valor: body.valor,
        recorrencia: body.recorrencia,
        tipo: body.tipo,
        observacao: body.observacao,
        data: new Date(body.data),
        usuario: {
          connect: { id: Number(session.user.id) },
        },
        categoria: {
          connect: { id: body.categoriaId },
        },
      },
    });

    return new Response(JSON.stringify(financeiro), { status: 200 });
  } catch (error) {
    console.error("Erro ao criar financeiro:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao criar financeiro." }),
      {
        status: 500,
      }
    );
  }
}

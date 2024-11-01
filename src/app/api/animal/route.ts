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

  const user = await db.animal.findMany({
    select: {
      id: true,
      nome: true,
      porte: true,
      sexo: true,
      tipo: true,
      // vacinado: true,
      adestrado: true,
      castrado: true,
      obito: true,
      microchip: true,
      adotado: true,
      observacao: true,
      dataNascimento: true,
      vacinasProvisorio: true,
      raca: {
        select: {
          id: true,
          nome: true,
        },
      },
      tutor: {
        select: {
          id: true,
          nome: true,
        },
      },
      imagem: true,
      criadoEm: true,
      atualizadoEm: true,
    },
    orderBy: {
      atualizadoEm: "desc",
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
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
      ...(body.porte && { porte: body.porte }),
      ...(body.sexo && { sexo: body.sexo }),
      ...(body.tipo && { tipo: body.tipo }),
      // ...(body.vacinado !== undefined && { vacinado: body.vacinado }),
      ...(body.castrado !== undefined && { castrado: body.castrado }),
      ...(body.obito !== undefined && { obito: body.obito }),
      ...(body.microchip !== undefined && { microchip: body.microchip }),
      ...(body.adestrado !== undefined && { adestrado: body.adestrado }),
      ...(body.adotado !== undefined && { adotado: body.adotado }),
      ...(body.dataNascimento && { dataNascimento: body.dataNascimento }),
      ...(body.racaId !== undefined && { racaId: body.racaId }),
      ...(body.tutorId !== undefined && { tutorId: body.tutorId }),
      ...(body.imagem && { imagem: body.imagem }),
      ...(body.observacao && { observacao: body.observacao }),
      ...(body.vacinasProvisorio && {
        vacinasProvisorio: body.vacinasProvisorio,
      }),
    };

    const user = await db.animal.update({
      where: {
        id: body.id,
      },
      data: updateData,
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar animal:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar animal." }),
      { status: 500 }
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
    const user = await db.animal.delete({
      where: {
        id: body.id,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir animal:", error);
    return new Response(JSON.stringify({ error: "Erro ao excluir animal." }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tutorIdAdotado = body.adotado === false && 2;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
      });
    }

    const user = await db.animal.create({
      data: {
        nome: body.nome,
        porte: body.porte,
        sexo: body.sexo,
        tipo: body.tipo,
        adestrado: body.adestrado,
        castrado: body.castrado,
        obito: body.obito,
        microchip: body.microchip,
        adotado: body.adotado,
        vacinasProvisorio: body.vacinasProvisorio,
        raca: {
          connect: {
            id: body.racaId,
          },
        },
        dataNascimento: body.dataNascimento,
        usuario: {
          connect: {
            id: Number(session.user.id),
          },
        },
        tutor: {
          connect: {
            id: tutorIdAdotado || body.tutorId,
          },
        },
        imagem: body.imagem,
        observacao: body.observacao,
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    return new Response(JSON.stringify({ error: "Erro ao criar animal." }), {
      status: 500,
    });
  }
}

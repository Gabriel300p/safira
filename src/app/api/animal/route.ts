import { db } from "@/lib/db";
export async function GET() {
  const user = await db.animal.findMany({
    select: {
      id: true,
      nome: true,
      porte: true,
      sexo: true,
      tipo: true,
      vacinado: true,
      castrado: true,
      obito: true,
      microchip: true,
      adotado: true,
      dataNascimento: true,
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
  try {
    const body = await req.json();

    const updateData = {
      ...(body.nome && { nome: body.nome }),
      ...(body.porte && { porte: body.porte }),
      ...(body.sexo && { sexo: body.sexo }),
      ...(body.tipo && { tipo: body.tipo }),
      ...(body.vacinado !== undefined && { vacinado: body.vacinado }),
      ...(body.castrado !== undefined && { castrado: body.castrado }),
      ...(body.obito !== undefined && { obito: body.obito }),
      ...(body.microchip !== undefined && { microchip: body.microchip }),
      ...(body.adotado !== undefined && { adotado: body.adotado }),
      ...(body.dataNascimento && { dataNascimento: body.dataNascimento }),
      ...(body.racaId !== undefined && { racaId: body.racaId }),
      ...(body.tutorId !== undefined && { tutorId: body.tutorId }),
      ...(body.imagem && { imagem: body.imagem }),
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

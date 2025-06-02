import { computed, signal } from "@preact/signals-react";
import { useContext, useState, type Context } from "react";
import type { DiaSemHorario } from "~/models/dia-sem-horario";

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  documento: string;
  data_nasc: DiaSemHorario;
}

export type CreateUsuario = Omit<Usuario, "id">;

interface UsuarioStorage extends Usuario {
  senha: string;
}

const CHAVE_STORAGE = "n2-usuarios";

function clearStorage() {
  localStorage.removeItem(CHAVE_STORAGE);
}

function getLocalStorage(): Usuario[] {
  const usuarios = localStorage.getItem(CHAVE_STORAGE);
  if (usuarios == null) return [];

  let usuariosProcessados: UsuarioStorage[] = [];
  let usuariosParsados: any;
  try {
    usuariosParsados = JSON.parse(usuarios);
  } catch (e) {
    clearStorage();
    console.error(e);
    return [];
  }

  for (let u of usuariosParsados) {
    try {
      usuariosProcessados.push({
        id: u.id,
        email: u.email,
        nome: u.nome,
        sobrenome: u.sobrenome,
        telefone: u.telefone,
        documento: u.documento,
        data_nasc: u.data_nasc,
        senha: u.senha,
      });
    } catch (e) {
      console.error("Usuário inválido: ", u, e);
    }
  }

  return usuariosProcessados;
}

const usuarios = signal<Usuario[]>(getLocalStorage());

addEventListener("storage", (ev) => {
  if (ev.key === CHAVE_STORAGE) {
    usuarios.value = getLocalStorage();
  }
});

const newUsuario = (user: CreateUsuario, senha: string) => {
  localStorage.setItem(
    CHAVE_STORAGE,
    JSON.stringify([
      ...usuarios.value,
      {
        ...user,
        id: crypto.randomUUID(),
      },
    ])
  );
};

export function useUsuarios() {
  return {
    usuarios: computed(() => usuarios.value),
    newUsuario,
  };
}

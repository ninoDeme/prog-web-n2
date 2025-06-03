import { useUsuarios } from "~/services/usuario";
import type { Route } from "./+types/home";
import {
  Button,
  Container,
  FormGroup,
  InputLabel,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DiaSemHorario } from "~/models/dia-sem-horario";
import { href, Router, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Criar novo usuário" },
    { name: "description", content: "Trabalho N2 Prog Web" },
  ];
}

export default function NovoUsuario() {
  const { usuarios, newUsuario } = useUsuarios();

  const [erro, setErro] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nasc, setNasc] = useState("");
  const [senha, setSenha] = useState("");

  let navigate = useNavigate();

  async function salvarUser() {
    try {
      newUsuario(
        {
          email,
          nome,
          sobrenome,
          telefone,
          data_nasc: DiaSemHorario.fromString(nasc),
        },
        senha
      );
    } catch (e: any) {
      console.error(e);
      setErro("Dados inválidos");
      return;
    }
    await navigate(href("/"));
  }

  return (
    <Container>
      <Paper>
        <Snackbar
          open={!!erro}
          autoHideDuration={5000}
          onClose={() => setErro(null)}
          message={erro}
        />
        <FormGroup className="form-usuario">
          <h1>Novo usuário</h1>
          <div>
            <InputLabel>Email</InputLabel>
            <TextField
              type="email"
              autoComplete="email"
              required
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <InputLabel>Nome</InputLabel>
            <TextField
              autoComplete="given-name"
              required
              onChange={(ev) => setNome(ev.target.value)}
            />
          </div>
          <div>
            <InputLabel>Sobrenome</InputLabel>
            <TextField
              autoComplete="family-name"
              required
              onChange={(ev) => setSobrenome(ev.target.value)}
            />
          </div>
          <div>
            <InputLabel>Telefone</InputLabel>
            <TextField
              autoComplete="tel"
              required
              onChange={(ev) => setTelefone(ev.target.value)}
            />
          </div>
          <div>
            <InputLabel>Data de Nascimento</InputLabel>
            <TextField
              autoComplete="bday"
              type="date"
              required
              onChange={(ev) => setNasc(ev.target.value)}
            />
          </div>
          <div>
            <InputLabel>Senha</InputLabel>
            <TextField
              autoComplete="new-password"
              type="password"
              required
              onChange={(ev) => setSenha(ev.target.value)}
            />
          </div>

          <Button variant="contained" onClick={() => salvarUser()}>
            Criar Usuário
          </Button>
        </FormGroup>
      </Paper>
    </Container>
  );
}

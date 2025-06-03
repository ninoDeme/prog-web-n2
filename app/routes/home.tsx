import { useUsuarios } from "~/services/usuario";
import type { Route } from "./+types/home";
import { Container, IconButton, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import CardUsuario from "~/components/CardUsuario";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "N2 Usuários!" },
    { name: "description", content: "Trabalho N2 Prog Web" },
  ];
}

export default function Home() {
  let { usuarios, removeUsuario } = useUsuarios();
  return (
    <Container>
      <h1>
        Usuários
        <NavLink to="/novo-usuario">
          <IconButton color="primary">
            <Add></Add>
          </IconButton>
        </NavLink>
      </h1>
      <Paper className="usuarios">
        {usuarios.value.map((u) => (
          <CardUsuario key={u.id} usuario={u} onDelete={() => removeUsuario(u.id)} />
        ))}
      </Paper>
    </Container>
  );
}

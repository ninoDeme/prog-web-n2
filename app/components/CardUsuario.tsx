import type { Usuario } from "~/services/usuario";
import { Container, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CardUsuario.css";

export default function CardUsuario(props: {
  usuario: Usuario;
  onDelete?: () => any;
}) {
  const u = props.usuario;
  return (
    <Container className="card-usuario flex-row">
      <div className="flex-col">
        <div className="flex-row">
          <label>Nome:</label>{" "}
          <span>
            {u.nome} {u.sobrenome}
          </span>
        </div>
        <div className="flex-row">
          <label>E-mail:</label> <span>{u.email}</span>
        </div>
        <div className="flex-row">
          <label>Telefone:</label> <span>{u.telefone}</span>
        </div>
        <div className="flex-row">
          <label>Data de nascimento:</label>
          <span>{u.data_nasc.toString()}</span>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex-col">
        <IconButton
          color="error"
          aria-label="Deletar usuario"
          onClick={() => props.onDelete?.()}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Container>
  );
}

import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "caoragemaumor@gmail.com",
    pass: "olmclyptwqxhqcav"
}});

router.post("/enviaEmail", async (req, res) => {
    const {id_cao, nome_cao, nome, email, localizacao, telefone, observacoes} = req.body;
try{
    await transporter.sendMail({
        from: `"Formulário do Site" <${"caoragemaumor@gmail.com"}>`,
        to: "caoragemaumor@gmail.com",
        subject: `Interesse submetido: #${id_cao} - ${nome_cao}`,//"Novo Formulário Submetido",
        text: `
            Informações preenchidas do Formulário:
            Nome: ${nome}
            Email: ${email}
            Localização: ${localizacao}
            Telefone: ${telefone}
            Observações: ${observacoes}
            `
        });
        res.send(`
            <script>
                const paginaAnterior = document.referrer;

                alert("Email enviado com sucesso!");

                if (paginaAnterior) {
                window.location.href = paginaAnterior; 
                } else {
                window.location.reload(); 
                }
            </script>
            `);

} catch (error) {
    console.error("Erro ao processar a requisição:", error);
    res.send(`
        <script>
                const paginaAnterior = document.referrer;

                alert("Erro ao enviar email, tente novamente mais tarde.");

                if (paginaAnterior) {
                window.location.href = paginaAnterior; 
                } else {
                window.location.reload(); 
                }
        </script>
        `);
}});

export default router;
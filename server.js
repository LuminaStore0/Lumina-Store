const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.json({ status: "Servidor ativo e funcional!" });
});

// Processar Recarga (M-Pesa / e-Mola)
app.post('/api/recarga', (req, res) => {
    const { telefone, valor, metodo } = req.body;
    if (!telefone || !valor) {
        return res.status(400).json({ sucesso: false, mensagem: "Dados incompletos!" });
    }
    res.json({ 
        sucesso: true, 
        mensagem: `Recarga de ${valor} MT via ${metodo} para o número ${telefone} em processamento. Confirme no celular.` 
    });
});

// Processar Saque (Com taxa de 5%)
app.post('/api/saque', (req, res) => {
    const { telefone, valor } = req.body;
    const taxa = valor * 0.05;
    const valorLiquido = valor - taxa;

    res.json({
        sucesso: true,
        mensagem: `Saque de ${valorLiquido} MT (taxa de 5% de desconto aplicada) enviado para ${telefone}.`
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});
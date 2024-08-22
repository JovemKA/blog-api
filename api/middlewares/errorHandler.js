module.exports = (err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Erro interno no servidor: ' + err.message });
};

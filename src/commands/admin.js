// Comandos de administrador para Bot Uchiha

const comandosAdmin = {
    mute: function(usuario) {
        // Silenciar usuário
        return `O usuário ${usuario} foi silenciado pela força do Sharingan!`; 
    },
    unmute: function(usuario) {
        // Liberar usuário
        return `O usuário ${usuario} foi liberado do silêncio. Que o Chakra dele nunca se esgote!`;
    },
    kick: function(usuario) {
        // Expulsar usuário
        return `O usuário ${usuario} foi expulso! O caminho do ninja é solitário.`;
    },
    promote: function(usuario) {
        // Promover usuário
        return `O usuário ${usuario} foi promovido ao status de líder do clã!`; 
    },
    demote: function(usuario) {
        // Rebaixar usuário
        return `O usuário ${usuario} foi rebaixado. que ele aprenda o verdadeiro caminho!`;
    },
    clearMessages: function(num) {
        // Limpar mensagens
        return `${num} mensagens foram apagadas pela ordem do clã!`;
    },
    groupWarnings: function(usuario) {
        // Avisos de grupo
        return `O usuário ${usuario} recebeu um aviso. Cuidado com o caminho que escolhe seguir!`;
    },
    setWelcomeMessage: function(mensagem) {
        // Configura mensagem de boas-vindas
        return `Mensagem de boas-vindas definida: ${mensagem}`;
    },
    setGoodbyeMessage: function(mensagem) {
        // Configura mensagem de despedida
        return `Mensagem de despedida definida: ${mensagem}`;
    },
    blockList: function(usuario) {
        // Gerenciar lista de bloqueio
        return `O usuário ${usuario} foi bloqueado. Não há retorno!`;
    },
    groupInfo: function() {
        // Informações sobre o grupo
        return `Informações do grupo: Aqui reside o clã Uchiha. Força e lealdade são suas virtudes!`;
    }
};

module.exports = comandosAdmin;
// src/menus/menuHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";

import { menuCompleto } from "./menuCompleto.js";
import { menuPrincipal } from "./menuPrincipal.js";
import { menuOpcoes } from "./menuOpcoes.js";

        // ─────────────────────────────
// 📜 TODOS OS MENUS OPCOES
// ─────────────────────────────
import { menuAlterador } from "./menuAlterador.js";
import { menuBot } from "./menuBot.js";
import { menuPremium } from "./menuPremium.js";
import { menuTheme } from "./menuTheme.js";

// 🔞 MENU & SUB'MENUS +18
import { menu18 } from "./menu18.js";
import { only18 } from "../subMenus/18/only18.js";
import { fotos18 } from "../subMenus/18/fotos18.js";
import { videos18 } from "../subMenus/18/videos18.js";
import { plaquinhas18 } from "../subMenus/18/plaquinhas18.js";

// 🔱 MENU & SUB'MENUS ADM
import { menuADM } from "./menuADM.js";
import { admAnti } from "../subMenus/admin/admAnti.js";
import { admListas } from "../subMenus/admin/admListas.js";
import { admConfig } from "../subMenus/admin/admConfig.js";
import { admLegendas } from "../subMenus/admin/admLegendas.js";
import { admSistemas } from "../subMenus/admin/admSistemas.js";
import { admModeracao } from "../subMenus/admin/admModeracao.js";
import { admGerenciamento } from "../subMenus/admin/admGerenciamento.js";

// 🎲 MENU & SUB'MENUS ALEATORIO
import { menuAleatorio } from "./menuAleatorio.js";
import { gtts } from "../subMenus/aleatorios/gtts.js";
import { multi } from "../subMenus/aleatorios/multi.js";
import { link } from "../subMenus/aleatorios/link.js";
import { jogos } from "../subMenus/aleatorios/jogos.js";
import { emoji } from "../subMenus/aleatorios/emoji.js";
import { perfil } from "../subMenus/aleatorios/perfil.js";
import { calculos } from "../subMenus/aleatorios/calculos.js";
import { conselhos } from "../subMenus/aleatorios/conselhos.js";
import { statusAleatorios } from "../subMenus/aleatorios/statusAleatorios.js";

// 🪁 MENU & SUB'MENUS BRINCADEIRAS
import { menuBrincadeiras } from "./menuBrincadeiras.js";
import { dar } from "../subMenus/brincadeiras/dar.js";
import { sorte } from "../subMenus/brincadeiras/sorte.js";
import { comer } from "../subMenus/brincadeiras/comer.js";
import { beijos } from "../subMenus/brincadeiras/beijos.js";
import { status } from "../subMenus/brincadeiras/status.js";
import { agressao } from "../subMenus/brincadeiras/agressao.js";
import { rankStatus } from "../subMenus/brincadeiras/rankStatus.js";

// 🗃️ MENU & SUB'MENUS DIVERSOS
import { menuDiversos } from "./menuDiversos.js";
import { ia } from "../subMenus/diversos/ia.js";
import { apps } from "../subMenus/diversos/apps.js";
import { series } from "../subMenus/diversos/series.js";
import { filmes } from "../subMenus/diversos/filmes.js";
import { cityOficial } from "../subMenus/diversos/cityOficial.js";
import { animesEdits } from "../subMenus/diversos/animesEdits.js";
import { animesWallpapers } from "../subMenus/diversos/animesWallpapers.js";

// 💻 MENU & SUB'MENUS OWNER
import { menuDono } from "./menuDono.js";
import { donoLevel } from "../subMenus/owner/donoLevel.js";
import { donoMidia } from "../subMenus/owner/donoMidia.js";
import { donoStatus } from "../subMenus/owner/donoStatus.js";
import { donoGrupos } from "../subMenus/owner/donoGrupos.js";
import { donoPremium } from "../subMenus/owner/donoPremium.js";
import { donoFinancas } from "../subMenus/owner/donoFinancas.js";
import { donoControle } from "../subMenus/owner/donoControle.js";
import { donoComandos } from "../subMenus/owner/donoComandos.js";
import { donoSeguranca } from "../subMenus/owner/donoSeguranca.js";

// 📲 MENU & SUB'MENUS DOWNLOADS
import { menuDownloads } from "./menuDownloads.js";
import { downloadsJogos } from "../subMenus/downloads/downloadsJogos.js";
import { downloadsVideo } from "../subMenus/downloads/downloadsVideo.js";
import { downloadsExtras } from "../subMenus/downloads/downloadsExtras.js";
import { downloadsSocial } from "../subMenus/downloads/downloadsSocial.js";
import { downloadsMusica } from "../subMenus/downloads/downloadsMusica.js";
import { downloadsArquivos } from "../subMenus/downloads/downloadsArquivos.js";

// 📸 MENU & SUB'MENUS EFEITOS
import { menuEfeitos } from "./menuEfeitos.js";
import { efeitosIlusao } from "../subMenus/efeitos/efeitosIlusao.js";
import { efeitosEspeciais } from "../subMenus/efeitos/efeitosEspeciais.js";
import { efeitosTematicos } from "../subMenus/efeitos/efeitosTematicos.js";
import { efeitosClassicos } from "../subMenus/efeitos/efeitosClassicos.js";
import { efeitosTransforma } from "../subMenus/efeitos/efeitosTransforma.js";

// ⁉️ MENU & SUB'MENUS +18
import { menuHelp } from "./menuHelp.js";
import { cmdMembros } from "../subMenus/help/cmdMembros.js";
import { puxarDados } from "../subMenus/help/puxarDados.js";
import { cmdInformativo } from "../subMenus/help/cmdInformativo.js";

// 🎮 MENU & SUB'MENUS JOGOS
import { menuJogos } from "./menuJogos.js";
import { gamesFirst } from "../subMenus/jogos/gamesFirst.js";
import { gamesSecond } from "../subMenus/jogos/gamesSecond.js";
import { gamesThird } from "../subMenus/jogos/gamesThird.js";

// 🎨 MENU & SUB'MENUS LOGOS
import { menuLogos } from "./menuLogos.js";
import { logosAv } from "../subMenus/logos/logosAv.js";
import { logosAv2 } from "../subMenus/logos/logosAv2.js";
import { logosAv3 } from "../subMenus/logos/logosAv3.js";
import { logosTexto } from "../subMenus/logos/logosTexto.js";
import { logosTexto2 } from "../subMenus/logos/logosTexto2.js";
import { logosTexto3 } from "../subMenus/logos/logosTexto3.js";
import { logosBasicos } from "../subMenus/logos/logosBasicos.js";

// 🌍 MENU & SUB'MENUS NEWS
import { menuNews } from "./menuNews.js";
import { esportes } from "../subMenus/news/esportes.js";
import { noticiasGerais } from "../subMenus/news/noticiasGerais.js";
import { entretenimentos } from "../subMenus/news/entretenimentos.js";
import { gamesTecnologia } from "../subMenus/news/gamesTecnologia.js";

// 🔍 MENUS & SUB'MENUS PESQUISAS
import { menuPesquisa } from "./menuPesquisa.js";
import { pesquisaMidia } from "../subMenus/pesquisa/pesquisaMidia.js";
import { pesquisaMusica } from "../subMenus/pesquisa/pesquisaMusica.js";
import { pesquisaBuscas } from "../subMenus/pesquisa/pesquisaBuscas.js";
import { pesquisaYoutube } from "../subMenus/pesquisa/pesquisaYoutube.js";
import { pesquisaNoticias } from "../subMenus/pesquisa/pesquisaNoticias.js";
import { pesquisaConsultas } from "../subMenus/pesquisa/pesquisaConsultas.js";

// 🩺 MENUS & SUB'MENUS SAÚDE
import { menuSaude } from "./menuSaude.js";
import { saude } from "../subMenus/saude/saude.js";
import { euAmo } from "../subMenus/saude/euAmo.js";
import { euAmo2 } from "../subMenus/saude/euAmo2.js";
import { interesses } from "../subMenus/saude/interesses.js";
import { interesses2 } from "../subMenus/saude/interesses2.js";

// 🎭 MENUS & SUB'MENUS STICKERS
import { menuStickers } from "./menuStickers.js";
import { emojisTexto } from "../subMenus/stickers/emojisTexto.js";
import { stickersTexto } from "../subMenus/stickers/stickersTexto.js";
import { stickersImagem } from "../subMenus/stickers/stickersImagem.js";
import { metadadosMarca } from "../subMenus/stickers/metadadosMarca.js";
import { stickersAleatorios } from "../subMenus/stickers/stickersAleatorios.js";

// 💰 MENUS & SUB'MENUS VIP
import { menuVip } from "./menuVip.js";
import { cmdVip } from "../subMenus/vip/cmdVip.js";
import { effectVip } from "../subMenus/vip/effectVip.js";
import { sistemVip } from "../subMenus/vip/sistemVip.js";

// FUNÇÃO
const VERSION = "10.0.1";
const DONO = "𝚁ú𝚋𝚎𝚗 𝚂𝚒𝚕𝚟𝚎𝚛";

function montarMenuFinal(
  corpo: string,
  prefix: string,
  hora: string,
  data: string,
  usuario: string,
  version: string,
  dono: string
) {
  return (
    menuPrincipal(hora, data, usuario, version, dono, prefix) +
    corpo
  )
}

/* ─────────────────────────── */

interface MenuContext {
  sock: WASocket;
  msg: proto.IWebMessageInfo;
  prefix: string;
}
/* ─────────────────────────── */
/* 🧠 BANCO DE MENUS */

const MENUS: Record<string, (...args: any[]) => string> = {
  "menu": (prefix) =>
    menuCompleto({
      hora: "00:00",
      data: "00/00/0000",
      usuario: "Usuário",
      version: "１０.０.１",
      dono: "𝚁ú𝚋𝚎𝚗 𝚂𝚒𝚕𝚟𝚎𝚛",
      prefix
    }),
  "menu-principal": (prefix) =>
    menuPrincipal(
      "00:00",
      "00/00/0000",
      "Usuário",
      "10.0.1",
      "𝚁ú𝚋𝚎𝚗 𝚂𝚒𝚕𝚟𝚎𝚛",
      prefix
    ),
  "menu-opcoes": (prefix) => menuOpcoes(prefix),
  
        // ─────────────────────────────
// 📜 TODOS OS MENUS OPCOES — CLÃ UCHIHA
// ─────────────────────────────
   "menu-alterador": menuAlterador,
   "menu-bot": menuBot,
   "menu-premium": menuPremium,
   "menu-theme": menuTheme,
 
    // ─────────────────────────────
// 🔞 MENU & SUB'MENUS +18 — CLÃ UCHIHA
// ─────────────────────────────
  "menu-18": menu18,
  "only-18": only18,
  "fotos-18": fotos18,
  "videos-18": videos18,
  "plaquinhas-18": plaquinhas18,
  
      // ─────────────────────────────
// 🔱 MENU & SUB'MENUS ADM — CLÃ UCHIHA
// ─────────────────────────────
  "menu-adm": menuADM,
  "adm-anti": admAnti,
  "adm-listas": admListas,
  "adm-config": admConfig,
  "adm-legendas": admLegendas,
  "adm-sistemas": admSistemas,
  "adm-moderacao": admModeracao,
  "adm-gerenciamento": admGerenciamento,
  
        // ─────────────────────────────
// 🎲 MENU & SUB'MENUS ALEATORIO — CLÃ UCHIHA
// ─────────────────────────────
  "menu-aleatorio": menuAleatorio,
  "gtts": gtts,
  "multi": multi,
  "link": link,
  "jogos": jogos,
  "emoji": emoji,
  "perfil": perfil,
  "calculos": calculos,
  "conselhos": conselhos,
  "status-aleatorios": statusAleatorios,
  
        // ─────────────────────────────
// 🪁 MENU & SUB'MENUS BRINCADEIRAS — CLÃ UCHIHA
// ─────────────────────────────
   "menu-brincadeiras": menuBrincadeiras,
   "dar": dar,
   "sorte": sorte,
   "comer": comer,
   "beijos": beijos,
   "status": status,
   "agressao": agressao,
   "rank-status": rankStatus,

        // ─────────────────────────────
// 🗃️ MENU & SUB'MENUS DIVERSOS — CLÃ UCHIHA
// ─────────────────────────────
   "menu-diversos": menuDiversos,
   "ia": ia,
   "apps": apps,
   "series": series,
   "filmes": filmes,
   "city-oficial": cityOficial,
   "animes-edits": animesEdits,
   "animes-wallpapers": animesWallpapers,
  
          // ─────────────────────────────
// 🗃️ MENU & SUB'MENUS OWNER — CLÃ UCHIHA
// ─────────────────────────────
   "menu-dono": menuDono,
   "dono-level": donoLevel,
   "dono-midia": donoMidia,
   "dono-status": donoStatus,
   "dono-grupos": donoGrupos,
   "dono-premium": donoPremium,
   "dono-financas": donoFinancas,
   "dono-controle": donoControle,
   "dono-comandos": donoComandos,
   "dono-seguranca": donoSeguranca,

          // ─────────────────────────────
// 🗃️ MENU & SUB'MENUS DOWNLOADS — CLÃ UCHIHA
// ─────────────────────────────
   "menu-downloads": menuDownloads,
   "downloads-jogos": downloadsJogos,
   "downloads-video": downloadsVideo,
   "downloads-extras": downloadsExtras,
   "downloads-social": downloadsSocial,
   "downloads-musica": downloadsMusica,
   "downloads-arquivos": downloadsArquivos,
  
            // ─────────────────────────────
// 📸 MENU & SUB'MENUS EFEITOS — CLÃ UCHIHA
// ─────────────────────────────
   "menu-efeitos": menuEfeitos,
   "efeitos-ilusao": efeitosIlusao,
   "efeitos-especiais": efeitosEspeciais,
   "efeitos-tematicos": efeitosTematicos,
   "efeitos-classicos": efeitosClassicos,
   "efeitos-transforma": efeitosTransforma,

            // ─────────────────────────────
// ⁉️ MENU & SUB'MENUS JOGOS — CLÃ UCHIHA
// ─────────────────────────────
    "menu-help": menuHelp,
    "cmd-membros": cmdMembros,
    "puxar-dados": puxarDados,
    "cmd-informativo": cmdInformativo,
   
            // ─────────────────────────────
// 🎮 MENU & SUB'MENUS JOGOS — CLÃ UCHIHA
// ─────────────────────────────
    "menu-jogos": menuJogos,
    "games-first": gamesFirst,
    "games-second": gamesSecond,
    "games-third": gamesThird,

            // ─────────────────────────────
// 🎨 MENU & SUB'MENUS LOGOS — CLÃ UCHIHA
// ─────────────────────────────
     "menu-logos": menuLogos,
     "logos-av": logosAv,
     "logos-av2": logosAv2,
     "logos-av3": logosAv3,
     "logos-texto": logosTexto,
     "logos-texto2": logosTexto2,
     "logos-texto3": logosTexto3,
     "logos-basicos": logosBasicos,

            // ─────────────────────────────
// 🎨 MENU & SUB'MENUS NEWS — CLÃ UCHIHA
// ─────────────────────────────
    "menu-news": menuNews,
    "esportes": esportes,
    "noticias-gerais": noticiasGerais,
    "entretenimentos": entretenimentos,
    "games-tecnologia": gamesTecnologia,
    
  // ─────────────────────────────
// 🔍 MENU / SUB'MENUS PESQUISA — CLÃ UCHIHA
// ─────────────────────────────
   "menu-pesquisa": menuPesquisa,
   "pesquisa-midia": pesquisaMidia,
   "pesquisa-musica": pesquisaMusica,
   "pesquisa-buscas": pesquisaBuscas,
   "pesquisa-youtube": pesquisaYoutube,
   "pesquisa-noticias": pesquisaNoticias,
   "pesquisa-consultas": pesquisaConsultas,

  // ─────────────────────────────
// 🔍 MENU / SUB'MENUS SAÚDE — CLÃ UCHIHA
// ─────────────────────────────
   "menu-saude": menuSaude,
   "saude": saude,
   "eu-amo": euAmo,
   "eu-amo2": euAmo2,
   "interesses": interesses,
   "interesses2": interesses2,
   
     // ─────────────────────────────
// 🔍 MENU / SUB'MENUS STICKERS — CLÃ UCHIHA
// ─────────────────────────────
   "menu-stickers": menuStickers,
   "emojis-texto": emojisTexto,
   "stickers-texto": stickersTexto,
   "stickers-imagem": stickersImagem,
   "metadados-marca": metadadosMarca,
   "stickers-aleatorios": stickersAleatorios,

     // ─────────────────────────────
// 🔍 MENU / SUB'MENUS VIP — CLÃ UCHIHA
// ─────────────────────────────
   "menu-vip": menuVip,
   "cmd-vip": cmdVip,
   "effect-vip": effectVip,
   "sistem-vip": sistemVip,
};

/* ─────────────────────────── */
/* 🎯 HANDLER */
export async function handleMenu(
  menuName: string,
  { sock, msg, prefix }: MenuContext
): Promise<boolean> {

  const jid = msg.key?.remoteJid;
  const sender = msg.key?.participant ?? jid;
  if (!jid || !sender) return false;

  const key = menuName.toLowerCase();
  const menuFn = MENUS[key];
  if (!menuFn) return false;

  // Hora e data automáticas
  const now = new Date();
  const hora = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const data = now.toLocaleDateString("pt-BR");

  // Nome amigável do usuário
  const usuario =
  msg.key?.participant?.split("@")[0] ??
  msg.key?.participant?.split("@")[0] ??
  "Usuário";

  // Monta o menu automaticamente
  const corpo = menuFn(prefix)

const texto = montarMenuFinal(
  corpo,
  prefix,
  hora,
  data,
  usuario,
  VERSION,
  DONO
);

  // Envia mensagem
  await sock.sendMessage(jid, {
    text: texto,
    mentions: [sender],
  });

  return true;
}
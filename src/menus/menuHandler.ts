// src/menus/menuHandler.ts
import { WASocket, proto } from "@whiskeysockets/baileys";

import { menuCompleto } from "./menuCompleto";
import { menuPrincipal } from "./menuPrincipal";
import { menuOpcoes } from "./menuOpcoes";

        // ─────────────────────────────
// 📜 TODOS OS MENUS OPCOES
// ─────────────────────────────
import { menuAlterador } from "./menuAlterador";
import { menuBot } from "./menuBot";
import { menuPremium } from "./menuPremium";
import { menuTheme } from "./menuTheme";

// 🔞 MENU & SUB'MENUS +18
import { menu18 } from "./menu18";
import { only18 } from "../subMenus/18/only18";
import { fotos18 } from "../subMenus/18/fotos18";
import { videos18 } from "../subMenus/18/videos18";
import { plaquinhas18 } from "../subMenus/18/plaquinhas18";

// 🔱 MENU & SUB'MENUS ADM
import { menuADM } from "./menuADM";
import { admAnti } from "../subMenus/admin/admAnti";
import { admListas } from "../subMenus/admin/admListas";
import { admConfig } from "../subMenus/admin/admConfig";
import { admLegendas } from "../subMenus/admin/admLegendas";
import { admSistemas } from "../subMenus/admin/admSistemas";
import { admModeracao } from "../subMenus/admin/admModeracao";
import { admGerenciamento } from "../subMenus/admin/admGerenciamento";

// 🎲 MENU & SUB'MENUS ALEATORIO
import { menuAleatorio } from "./menuAleatorio";
import { gtts } from "../subMenus/aleatorios/gtts";
import { multi } from "../subMenus/aleatorios/multi";
import { link } from "../subMenus/aleatorios/link";
import { jogos } from "../subMenus/aleatorios/jogos";
import { emoji } from "../subMenus/aleatorios/emoji";
import { perfil } from "../subMenus/aleatorios/perfil";
import { calculos } from "../subMenus/aleatorios/calculos";
import { conselhos } from "../subMenus/aleatorios/conselhos";
import { statusAleatorios } from "../subMenus/aleatorios/statusAleatorios";

// 🪁 MENU & SUB'MENUS BRINCADEIRAS
import { menuBrincadeiras } from "./menuBrincadeiras";
import { dar } from "../subMenus/brincadeiras/dar";
import { sorte } from "../subMenus/brincadeiras/sorte";
import { comer } from "../subMenus/brincadeiras/comer";
import { beijos } from "../subMenus/brincadeiras/beijos";
import { status } from "../subMenus/brincadeiras/status";
import { agressao } from "../subMenus/brincadeiras/agressao";
import { rankStatus } from "../subMenus/brincadeiras/rankStatus";

// 🗃️ MENU & SUB'MENUS DIVERSOS
import { menuDiversos } from "./menuDiversos";
import { ia } from "../subMenus/diversos/ia";
import { apps } from "../subMenus/diversos/apps";
import { series } from "../subMenus/diversos/series";
import { filmes } from "../subMenus/diversos/filmes";
import { cityOficial } from "../subMenus/diversos/cityOficial";
import { animesEdits } from "../subMenus/diversos/animesEdits";
import { animesWallpapers } from "../subMenus/diversos/animesWallpapers";

// 💻 MENU & SUB'MENUS OWNER
import { menuDono } from "./menuDono";
import { donoLevel } from "../subMenus/owner/donoLevel";
import { donoMidia } from "../subMenus/owner/donoMidia";
import { donoStatus } from "../subMenus/owner/donoStatus";
import { donoGrupos } from "../subMenus/owner/donoGrupos";
import { donoPremium } from "../subMenus/owner/donoPremium";
import { donoFinancas } from "../subMenus/owner/donoFinancas";
import { donoControle } from "../subMenus/owner/donoControle";
import { donoComandos } from "../subMenus/owner/donoComandos";
import { donoSeguranca } from "../subMenus/owner/donoSeguranca";

// 📲 MENU & SUB'MENUS DOWNLOADS
import { menuDownloads } from "./menuDownloads";
import { downloadsJogos } from "../subMenus/downloads/downloadsJogos";
import { downloadsVideo } from "../subMenus/downloads/downloadsVideo";
import { downloadsExtras } from "../subMenus/downloads/downloadsExtras";
import { downloadsSocial } from "../subMenus/downloads/downloadsSocial";
import { downloadsMusica } from "../subMenus/downloads/downloadsMusica";
import { downloadsArquivos } from "../subMenus/downloads/downloadsArquivos";

// 📸 MENU & SUB'MENUS EFEITOS
import { menuEfeitos } from "./menuEfeitos";
import { efeitosIlusao } from "../subMenus/efeitos/efeitosIlusao";
import { efeitosEspeciais } from "../subMenus/efeitos/efeitosEspeciais";
import { efeitosTematicos } from "../subMenus/efeitos/efeitosTematicos";
import { efeitosClassicos } from "../subMenus/efeitos/efeitosClassicos";
import { efeitosTransforma } from "../subMenus/efeitos/efeitosTransforma";

// ⁉️ MENU & SUB'MENUS +18
import { menuHelp } from "./menuHelp";
import { cmdMembros } from "../subMenus/help/cmdMembros";
import { puxarDados } from "../subMenus/help/puxarDados";
import { cmdInformativo } from "../subMenus/help/cmdInformativo";

// 🎮 MENU & SUB'MENUS JOGOS
import { menuJogos } from "./menuJogos";
import { gamesFirst } from "../subMenus/jogos/gamesFirst";
import { gamesSecond } from "../subMenus/jogos/gamesSecond";
import { gamesThird } from "../subMenus/jogos/gamesThird";

// 🎨 MENU & SUB'MENUS LOGOS
import { menuLogos } from "./menuLogos";
import { logosAv } from "../subMenus/logos/logosAv";
import { logosAv2 } from "../subMenus/logos/logosAv2";
import { logosAv3 } from "../subMenus/logos/logosAv3";
import { logosTexto } from "../subMenus/logos/logosTexto";
import { logosTexto2 } from "../subMenus/logos/logosTexto2";
import { logosTexto3 } from "../subMenus/logos/logosTexto3";
import { logosBasicos } from "../subMenus/logos/logosBasicos";

// 🌍 MENU & SUB'MENUS NEWS
import { menuNews } from "./menuNews";
import { esportes } from "../subMenus/news/esportes";
import { noticiasGerais } from "../subMenus/news/noticiasGerais";
import { entretenimentos } from "../subMenus/news/entretenimentos";
import { gamesTecnologia } from "../subMenus/news/gamesTecnologia";

// 🔍 MENUS & SUB'MENUS PESQUISAS
import { menuPesquisa } from "./menuPesquisa";
import { pesquisaMidia } from "../subMenus/pesquisa/pesquisaMidia";
import { pesquisaMusica } from "../subMenus/pesquisa/pesquisaMusica";
import { pesquisaBuscas } from "../subMenus/pesquisa/pesquisaBuscas";
import { pesquisaYoutube } from "../subMenus/pesquisa/pesquisaYoutube";
import { pesquisaNoticias } from "../subMenus/pesquisa/pesquisaNoticias";
import { pesquisaConsultas } from "../subMenus/pesquisa/pesquisaConsultas";

// 🩺 MENUS & SUB'MENUS SAÚDE
import { menuSaude } from "./menuSaude";
import { saude } from "../subMenus/saude/saude";
import { euAmo } from "../subMenus/saude/euAmo";
import { euAmo2 } from "../subMenus/saude/euAmo2";
import { interesses } from "../subMenus/saude/interesses";
import { interesses2 } from "../subMenus/saude/interesses2";

// 🎭 MENUS & SUB'MENUS STICKERS
import { menuStickers } from "./menuStickers";
import { emojisTexto } from "../subMenus/stickers/emojisTexto";
import { stickersTexto } from "../subMenus/stickers/stickersTexto";
import { stickersImagem } from "../subMenus/stickers/stickersImagem";
import { metadadosMarca } from "../subMenus/stickers/metadadosMarca";
import { stickersAleatorios } from "../subMenus/stickers/stickersAleatorios";

// 💰 MENUS & SUB'MENUS VIP
import { menuVip } from "./menuVip";
import { cmdVip } from "../subMenus/vip/cmdVip";
import { effectVip } from "../subMenus/vip/effectVip";
import { sistemVip } from "../subMenus/vip/sistemVip";

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
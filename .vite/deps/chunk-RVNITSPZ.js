import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/nsis.js
var require_nsis = __commonJS({
  "node_modules/highlight.js/lib/languages/nsis.js"(exports, module) {
    function nsis(hljs) {
      const CONSTANTS = {
        className: "variable",
        begin: /\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)/
      };
      const DEFINES = {
        // ${defines}
        className: "variable",
        begin: /\$+\{[\w.:-]+\}/
      };
      const VARIABLES = {
        // $variables
        className: "variable",
        begin: /\$+\w+/,
        illegal: /\(\)\{\}/
      };
      const LANGUAGES = {
        // $(language_strings)
        className: "variable",
        begin: /\$+\([\w^.:-]+\)/
      };
      const PARAMETERS = {
        // command parameters
        className: "params",
        begin: "(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)"
      };
      const COMPILER = {
        // !compiler_flags
        className: "keyword",
        begin: /!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|if|ifdef|ifmacrodef|ifmacrondef|ifndef|include|insertmacro|macro|macroend|makensis|packhdr|searchparse|searchreplace|system|tempfile|undef|verbose|warning)/
      };
      const METACHARS = {
        // $\n, $\r, $\t, $$
        className: "meta",
        begin: /\$(\\[nrt]|\$)/
      };
      const PLUGINS = {
        // plug::ins
        className: "class",
        begin: /\w+::\w+/
      };
      const STRING = {
        className: "string",
        variants: [
          {
            begin: '"',
            end: '"'
          },
          {
            begin: "'",
            end: "'"
          },
          {
            begin: "`",
            end: "`"
          }
        ],
        illegal: /\n/,
        contains: [
          METACHARS,
          CONSTANTS,
          DEFINES,
          VARIABLES,
          LANGUAGES
        ]
      };
      return {
        name: "NSIS",
        case_insensitive: false,
        keywords: {
          keyword: "Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecShellWait ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileWriteUTF16LE FileSeek FileWrite FileWriteByte FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetKnownFolderPath GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfRtlLanguage IfShellVarContextAll IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText Int64Cmp Int64CmpU Int64Fmt IntCmp IntCmpU IntFmt IntOp IntPtrCmp IntPtrCmpU IntPtrOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadAndSetImage LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestLongPathAware ManifestMaxVersionTested ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PEAddResource PEDllCharacteristics PERemoveResource PESubsysVer Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegMultiStr WriteRegNone WriteRegStr WriteUninstaller XPStyle",
          literal: "admin all auto both bottom bzip2 colored components current custom directory false force hide highest ifdiff ifnewer instfiles lastused leave left license listonly lzma nevershow none normal notset off on open print right show silent silentlog smooth textonly top true try un.components un.custom un.directory un.instfiles un.license uninstConfirm user Win10 Win7 Win8 WinVista zlib"
        },
        contains: [
          hljs.HASH_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.COMMENT(
            ";",
            "$",
            {
              relevance: 0
            }
          ),
          {
            className: "function",
            beginKeywords: "Function PageEx Section SectionGroup",
            end: "$"
          },
          STRING,
          COMPILER,
          DEFINES,
          VARIABLES,
          LANGUAGES,
          PARAMETERS,
          PLUGINS,
          hljs.NUMBER_MODE
        ]
      };
    }
    module.exports = nsis;
  }
});

export {
  require_nsis
};
//# sourceMappingURL=chunk-RVNITSPZ.js.map

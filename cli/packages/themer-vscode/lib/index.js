const path = require("path"),
  { version } = require("../package.json");

const packageName = "theme-themer-vscode";
const themesDirectory = "themes";
const iconFileName = "icon.svg";
const getThemeFileName = theme => `themer-${theme}-color-theme.json`;
const getHumanTheme = theme => (theme === "dark" ? "Dark" : "Light");
const getShadow = colorSet =>
  colorSet.theme === "dark"
    ? colorSet.colors.shade0
    : `${colorSet.colors.shade7}66`;

const toColorSets = colors =>
  Object.entries(colors).map(([theme, colors]) => ({
    theme,
    colors
  }));

const render = colors => {
  const colorSets = toColorSets(colors);
  return [
    renderPackageJsonFile(colorSets),
    renderReadmeFile(colorSets),
    renderIconFile(colors),
    ...renderThemeFiles(colorSets)
  ];
};

const renderPackageJsonFile = colorSets =>
  Promise.resolve({
    name: path.join(packageName, "package.json"),
    contents: Buffer.from(
      JSON.stringify(
        {
          name: packageName,
          displayName: "Themer VS Code Themes",
          description: "Personal theme generated by themer",
          version,
          publisher: "Themer",
          engines: {
            vscode: "^1.14.0"
          },
          categories: ["Themes"],
          icon: path.join(".", iconFileName),
          contributes: {
            themes: colorSets.map(colorSet => ({
              label: `Themer ${getHumanTheme(colorSet.theme)}`,
              uiTheme: colorSet.theme === 'dark' ? 'vs-dark' : 'vs',
              path: path.join(
                ".",
                themesDirectory,
                getThemeFileName(colorSet.theme)
              )
            }))
          }
        },
        null,
        2
      )
    )
  });

const renderReadmeFile = colorSets => {
  const themeOrThemes = colorSets.length === 1 ? "theme" : "themes";
  return Promise.resolve({
    name: path.join(packageName, "README.md"),
    contents: Buffer.from(
      `Your personal ${themeOrThemes}, generated by the [VS Code template](https://github.com/mjswensen/themer/tree/master/cli/packages/themer-vscode) for [themer](https://github.com/mjswensen/themer).`
    )
  });
};

const renderIconFile = colors => {
  const name = path.join(packageName, iconFileName);
  if (colors.light && colors.dark) {
    const { dark, light } = colors;
    return Promise.resolve({
      name,
      contents: Buffer.from(`
        <svg width="400px" height="400px" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="shadeGradientLight">
              <stop stop-color="${light.shade1}" offset="0%"></stop>
              <stop stop-color="${light.shade2}" offset="16.67%"></stop>
              <stop stop-color="${light.shade3}" offset="33.33%"></stop>
              <stop stop-color="${light.shade4}" offset="50%"></stop>
              <stop stop-color="${light.shade5}" offset="66.67%"></stop>
              <stop stop-color="${light.shade6}" offset="83.33%"></stop>
              <stop stop-color="${light.shade7}" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="shadeGradientDark">
              <stop stop-color="${dark.shade1}" offset="0%"></stop>
              <stop stop-color="${dark.shade2}" offset="16.67%"></stop>
              <stop stop-color="${dark.shade3}" offset="33.33%"></stop>
              <stop stop-color="${dark.shade4}" offset="50%"></stop>
              <stop stop-color="${dark.shade5}" offset="66.67%"></stop>
              <stop stop-color="${dark.shade6}" offset="83.33%"></stop>
              <stop stop-color="${dark.shade7}" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g id="light">
            <rect fill="${light.shade0}" x="0" y="0" width="400" height="200"></rect>
            <rect fill="${light.accent0}" x="28" y="28" width="74" height="37"></rect>
            <rect fill="${light.accent1}" x="118" y="28" width="74" height="37"></rect>
            <rect fill="${light.accent2}" x="208" y="28" width="74" height="37"></rect>
            <rect fill="${light.accent3}" x="298" y="28" width="74" height="37"></rect>
            <rect fill="${light.accent4}" x="28" y="81" width="74" height="37"></rect>
            <rect fill="${light.accent5}" x="118" y="81" width="74" height="37"></rect>
            <rect fill="${light.accent6}" x="208" y="81" width="74" height="37"></rect>
            <rect fill="${light.accent7}" x="298" y="81" width="74" height="37"></rect>
            <rect fill="url(#shadeGradientLight)" x="28" y="134" width="344" height="37"></rect>
          </g>
          <g id="dark" transform="translate(0.000000, 200.000000)">
            <rect fill="${dark.shade0}" x="0" y="0" width="400" height="200"></rect>
            <rect fill="${dark.accent0}" x="28" y="28" width="74" height="37"></rect>
            <rect fill="${dark.accent1}" x="118" y="28" width="74" height="37"></rect>
            <rect fill="${dark.accent2}" x="208" y="28" width="74" height="37"></rect>
            <rect fill="${dark.accent3}" x="298" y="28" width="74" height="37"></rect>
            <rect fill="${dark.accent4}" x="28" y="81" width="74" height="37"></rect>
            <rect fill="${dark.accent5}" x="118" y="81" width="74" height="37"></rect>
            <rect fill="${dark.accent6}" x="208" y="81" width="74" height="37"></rect>
            <rect fill="${dark.accent7}" x="298" y="81" width="74" height="37"></rect>
            <rect fill="url(#shadeGradientDark)" x="28" y="134" width="344" height="37"></rect>
          </g>
        </svg>
      `)
    });
  } else {
    const {
      shade0,
      shade1,
      shade2,
      shade3,
      shade4,
      shade5,
      shade6,
      shade7,
      accent0,
      accent1,
      accent2,
      accent3,
      accent4,
      accent5,
      accent6,
      accent7
    } =
      colors.dark || colors.light;
    return Promise.resolve({
      name,
      contents: Buffer.from(`
      <svg width="400px" height="400px" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="shadeGradient">
            <stop stop-color="${shade1}" offset="0%"></stop>
            <stop stop-color="${shade2}" offset="16.67%"></stop>
            <stop stop-color="${shade3}" offset="33.33%"></stop>
            <stop stop-color="${shade4}" offset="50%"></stop>
            <stop stop-color="${shade5}" offset="66.67%"></stop>
            <stop stop-color="${shade6}" offset="83.33%"></stop>
            <stop stop-color="${shade7}" offset="100%"></stop>
          </linearGradient>
        </defs>
        <rect fill="${shade0}" x="0" y="0" width="400" height="400"></rect>
        <rect fill="${accent0}" x="28" y="28" width="74" height="74"></rect>
        <rect fill="${accent1}" x="118" y="28" width="74" height="74"></rect>
        <rect fill="${accent2}" x="208" y="28" width="74" height="74"></rect>
        <rect fill="${accent3}" x="298" y="28" width="74" height="74"></rect>
        <rect fill="${accent4}" x="28" y="118" width="74" height="74"></rect>
        <rect fill="${accent5}" x="118" y="118" width="74" height="74"></rect>
        <rect fill="${accent6}" x="208" y="118" width="74" height="74"></rect>
        <rect fill="${accent7}" x="298" y="118" width="74" height="74"></rect>
        <rect fill="url(#shadeGradient)" x="27" y="208" width="344" height="164"></rect>
      </svg>
    `)
    });
  }
};

const renderThemeFiles = colorSets =>
  colorSets.map(colorSet => {
    const {
      shade0,
      shade1,
      shade2,
      shade3,
      shade4,
      shade5,
      shade6,
      shade7,
      accent0,
      accent1,
      accent2,
      accent3,
      accent4,
      accent5,
      accent6,
      accent7
    } = colorSet.colors;
    const shadow = getShadow(colorSet);
    return Promise.resolve({
      name: path.join(
        packageName,
        themesDirectory,
        getThemeFileName(colorSet.theme)
      ),
      contents: Buffer.from(
        JSON.stringify(
          {
            name: `Themer ${getHumanTheme(colorSet.theme)}`,
            type: colorSet.theme,
            colors: {
              // Base colors
              focusBorder: accent6,
              foreground: shade7,
              "widget.shadow": shadow,
              "selection.background": shade2,
              errorForeground: accent0,

              // Button control
              "button.background": accent5,
              "button.foreground": shade0,
              "button.hoverBackground": accent4,

              // Dropdown control
              "dropdown.background": shade1,
              "dropdown.border": shade1,
              "dropdown.foreground": shade6,

              // Input control
              "input.background": shade1,
              "input.border": shade1,
              "input.foreground": shade6,
              "input.placeholderForeground": shade2,
              "inputOption.activeBorder": accent4,
              "inputValidation.errorBackground": shade1,
              "inputValidation.errorBorder": accent0,
              "inputValidation.infoBackground": shade1,
              "inputValidation.infoBorder": accent5,
              "inputValidation.warningBackground": shade1,
              "inputValidation.warningBorder": accent1,

              // Scroll bar control
              "scrollbar.shadow": shadow,
              "scrollbarSlider.activeBackground": `${shade5}7f`,
              "scrollbarSlider.background": `${shade3}7f`,
              "scrollbarSlider.hoverBackground": `${shade4}7f`,

              // Badge
              "badge.foreground": shade0,
              "badge.background": accent6,

              // Progress bar
              "progressBar.background": accent3,

              // Lists and trees
              "list.activeSelectionBackground": `${accent3}7f`,
              "list.activeSelectionForeground": shade0,
              "list.dropBackground": shade3,
              "list.focusBackground": shade3,
              "list.highlightForeground": accent2,
              "list.hoverBackground": shade1,
              "list.inactiveSelectionBackground": shade1,
              "list.inactiveSelectionForeground": shade7,
              "list.hoverForeground": shade5,
              "list.focusForeground": shade0,
              "list.invalidItemForeground": accent0,
              "list.errorForeground": accent0,
              "list.warningForeground": accent2,
              "listFilterWidget.background": shade1,
              "listFilterWidget.outline": accent5,
              "listFilterWidget.noMatchesOutline": accent0,
              "tree.indentGuidesStroke": shade1,

              // Activity bar
              "activityBar.background": shade0,
              "activityBar.dropBackground": shade1,
              "activityBar.foreground": shade5,
              "activityBar.border": shade0,
              "activityBarBadge.background": accent6,
              "activityBarBadge.foreground": shade0,

              // Side bar
              "sideBar.background": shade0,
              "sideBar.foreground": shade6,
              "sideBar.border": shade1,
              "sideBarTitle.foreground": shade5,
              "sideBarSectionHeader.background": shade2,
              "sideBarSectionHeader.foreground": shade6,

              // Editor groups & tabs
              "editorPane.background": shade0,
              "editorGroup.emptyBackground": shade0,
              "editorGroup.border": shade1,
              "editorGroup.focusedEmptyBorder": shade1,
              "editorGroup.dropBackground": `${shade2}7f`,
              "editorGroupHeader.noTabsBackground": shade0,
              "editorGroupHeader.tabsBackground": shade0,
              "editorGroupHeader.tabsBorder": shade0,
              "tab.activeBackground": shade0,
              "tab.activeForeground": shade6,
              "tab.border": shade0,
              "tab.inactiveBackground": shade1,
              "tab.inactiveForeground": shade3,
              "tab.unfocusedActiveForeground": shade3,
              "tab.unfocusedInactiveForeground": shade2,

              // Editor colors
              "editor.background": shade0,
              "editor.foreground": shade7,
              "editorLineNumber.foreground": shade2,
              "editorCursor.foreground": accent6,
              "editor.selectionBackground": `${accent5}33`,
              "editor.selectionHighlightBackground": shade1,
              "editor.inactiveSelectionBackground": `${accent5}33`,
              "editor.wordHighlightBackground": `${accent6}7f`,
              "editor.wordHighlightStrongBackground": `${accent7}7f`,
              "editor.findMatchBackground": `${accent2}7f`,
              "editor.findMatchHighlightBackground": `${accent2}3f`,
              "editor.findRangeHighlightBackground": shade1,
              "editor.hoverHighlightBackground": shade2,
              "editor.lineHighlightBackground": shade0,
              "editor.lineHighlightBorder": shade1,
              "editorLink.activeForeground": accent4,
              "editor.rangeHighlightBackground": shade1,
              "editorWhitespace.foreground": shade1,
              "editorIndentGuide.background": shade1,
              "editorIndentGuide.activeBackground": shade2,
              "editorRuler.foreground": shade1,
              "editorCodeLens.foreground": shade5,
              "editorBracketMatch.background": shade1,
              "editorBracketMatch.border": shade1,
              "editorOverviewRuler.border": shade1,
              "editorOverviewRuler.findMatchForeground": `${accent2}bf`,
              "editorOverviewRuler.rangeHighlightForeground": `${shade2}bf`,
              "editorOverviewRuler.selectionHighlightForeground": `${shade1}bf`,
              "editorOverviewRuler.wordHighlightForeground": `${shade2}bf`,
              "editorOverviewRuler.wordHighlightStrongForeground": `${shade3}bf`,
              "editorOverviewRuler.modifiedForeground": `${accent2}7f`,
              "editorOverviewRuler.addedForeground": `${accent3}7f`,
              "editorOverviewRuler.deletedForeground": `${accent0}7f`,
              "editorOverviewRuler.errorForeground": `${accent0}7f`,
              "editorOverviewRuler.warningForeground": `${accent1}7f`,
              "editorOverviewRuler.infoForeground": `${accent5}7f`,
              "editorError.foreground": accent0,
              "editorError.border": shade7,
              "editorWarning.foreground": accent1,
              "editorWarning.border": shade6,
              "editorGutter.background": shade0,
              "editorGutter.modifiedBackground": accent2,
              "editorGutter.addedBackground": accent3,
              "editorGutter.deletedBackground": accent0,

              // Diff editor colors
              "diffEditor.insertedTextBackground": `${accent3}20`,
              "diffEditor.removedTextBackground": `${accent0}20`,

              // Editor widget colors
              "editorWidget.background": shade1,
              "editorWidget.border": shade1,
              "editorSuggestWidget.background": shade1,
              "editorSuggestWidget.border": shade1,
              "editorSuggestWidget.foreground": shade6,
              "editorSuggestWidget.highlightForeground": accent7,
              "editorSuggestWidget.selectedBackground": shade2,
              "editorHoverWidget.background": shade1,
              "editorHoverWidget.border": shade1,
              "debugExceptionWidget.background": shade1,
              "debugExceptionWidget.border": shade1,
              "editorMarkerNavigation.background": shade1,
              "editorMarkerNavigationError.background": accent0,
              "editorMarkerNavigationWarning.background": accent1,

              // Peek view colors
              "peekView.border": accent7,
              "peekViewEditor.background": shade1,
              "peekViewEditorGutter.background": shade1,
              "peekViewEditor.matchHighlightBackground": `${accent2}7f`,
              "peekViewResult.background": shade1,
              "peekViewResult.fileForeground": shade6,
              "peekViewResult.lineForeground": shade2,
              "peekViewResult.matchHighlightBackground": accent2,
              "peekViewResult.selectionBackground": shade3,
              "peekViewResult.selectionForeground": shade7,
              "peekViewTitle.background": shade2,
              "peekViewTitleDescription.foreground": shade5,
              "peekViewTitleLabel.foreground": shade7,

              // Merge conflicts
              "merge.currentHeaderBackground": `${accent4}4c`,
              "merge.currentContentBackground": `${accent4}4c`,
              "merge.incomingHeaderBackground": `${accent5}4c`,
              "merge.incomingContentBackground": `${accent5}4c`,
              "merge.commonContentBackground": `${accent6}4c`,
              "merge.commonHeaderBackground": `${accent6}4c`,
              "merge.border": shade4,
              "editorOverviewRuler.currentContentForeground": accent4,
              "editorOverviewRuler.incomingContentForeground": accent5,
              "editorOverviewRuler.commonContentForeground": accent6,

              // Panel colors
              "panel.background": shade0,
              "panel.border": shade1,
              "panelTitle.activeBorder": shade3,
              "panelTitle.activeForeground": shade6,
              "panelTitle.inactiveForeground": shade4,

              // Status bar colors
              "statusBar.background": accent5,
              "statusBar.foreground": shade0,
              "statusBar.border": `${accent5}7f`,
              "statusBar.debuggingBackground": accent1,
              "statusBar.debuggingForeground": shade0,
              "statusBar.debuggingBorder": `${accent1}7f`,
              "statusBar.noFolderBackground": accent6,
              "statusBar.noFolderForeground": shade0,
              "statusBar.noFolderBorder": `${accent6}7f`,
              "statusBarItem.activeBackground": accent4,
              "statusBarItem.hoverBackground": accent3,
              "statusBarItem.prominentBackground": accent4,
              "statusBarItem.prominentHoverBackground": accent3,

              // Title bar colors

              "titleBar.activeBackground": shade0,
              "titleBar.activeForeground": shade5,
              "titleBar.inactiveBackground": shade0,
              "titleBar.inactiveForeground": shade3,

              // Notification dialog colors
              "notification.background": shade1,
              "notification.foreground": shade7,
              "notification.buttonBackground": accent5,
              "notification.buttonHoverBackground": accent4,
              "notification.buttonForeground": shade0,
              "notification.infoBackground": accent5,
              "notification.infoForeground": shade0,
              "notification.warningBackground": accent1,
              "notification.warningForeground": shade0,
              "notification.errorBackground": accent0,
              "notification.errorForeground": shade0,

              // Extensions
              "extensionButton.prominentForeground": shade0,
              "extensionButton.prominentBackground": accent5,
              "extensionButton.prominentHoverBackground": accent4,

              // Quick picker
              "pickerGroup.border": shade5,
              "pickerGroup.foreground": shade7,

              // Integrated terminal colors
              "terminal.background": shade0,
              "terminal.foreground": shade6,
              "terminal.ansiBlack": shade0,
              "terminal.ansiBlue": accent5,
              "terminal.ansiBrightBlack": shade1,
              "terminal.ansiBrightBlue": accent5,
              "terminal.ansiBrightCyan": accent4,
              "terminal.ansiBrightGreen": accent4,
              "terminal.ansiBrightMagenta": accent7,
              "terminal.ansiBrightRed": accent1,
              "terminal.ansiBrightWhite": shade7,
              "terminal.ansiBrightYellow": accent2,
              "terminal.ansiCyan": accent4,
              "terminal.ansiGreen": accent3,
              "terminal.ansiMagenta": accent7,
              "terminal.ansiRed": accent0,
              "terminal.ansiWhite": shade6,
              "terminal.ansiYellow": accent2,
              "terminal.selectionBackground": `${accent5}7f`,
              "terminalCursor.background": shade1,
              "terminalCursor.foreground": shade5,

              // Debug
              "debugToolBar.background": shade1,

              // Welcome page
              "welcomePage.buttonBackground": shade1,
              "welcomePage.buttonHoverBackground": shade2,
              "walkThrough.embeddedEditorBackground": shade0,

              // Git
              "gitDecoration.modifiedResourceForeground": accent2,
              "gitDecoration.deletedResourceForeground": accent0,
              "gitDecoration.untrackedResourceForeground": accent6,
              "gitDecoration.ignoredResourceForeground": shade3,
              "gitDecoration.conflictingResourceForeground": accent4
            },
            tokenColors: [
              {
                settings: {
                  background: shade0,
                  foreground: shade6,
                  selectionBorder: shade5,
                  findHighlight: accent2,
                  findHighlightForeground: shade0,
                  activeGuide: accent1,
                  bracketsForeground: `${shade6}7F`,
                  bracketsOptions: "stippled_underline",
                  bracketsContentsForeground: `${shade6}7F`,
                  tagsOptions: "stippled_underline"
                }
              },
              {
                name: "Comment",
                scope: "comment",
                settings: {
                  foreground: shade3
                }
              },
              {
                name: "Constant",
                scope: "constant",
                settings: {
                  foreground: accent7
                }
              },
              {
                name: "Entity",
                scope: "entity",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Invalid",
                scope: "invalid",
                settings: {
                  foreground: accent0
                }
              },
              {
                name: "Keyword",
                scope: "keyword",
                settings: {
                  foreground: accent6
                }
              },
              {
                name: "Storage",
                scope: "storage",
                settings: {
                  foreground: accent7
                }
              },
              {
                name: "String",
                scope: "string",
                settings: {
                  foreground: accent3
                }
              },
              {
                name: "Support",
                scope: "support",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Variable",
                scope: "variable",
                settings: {
                  foreground: shade7
                }
              },
              {
                name: "Markup Heading",
                scope: "markup.heading",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Markup Deleted",
                scope: "markup.deleted",
                settings: {
                  foreground: accent0
                }
              },
              {
                name: "Markup Inserted",
                scope: "markup.inserted",
                settings: {
                  foreground: accent3
                }
              },
              {
                name: "Markup Changed",
                scope: "markup.changed",
                settings: {
                  foreground: accent2
                }
              },
              {
                name: "Markup Underline",
                scope: "markup.underline",
                settings: {
                  fontStyle: "underline"
                }
              },
              {
                name: "Markup Underline Link",
                scope: "markup.underline.link",
                settings: {
                  foreground: accent5
                }
              },
              {
                name: "Markup List",
                scope: "markup.list",
                settings: {
                  foreground: shade7
                }
              },
              {
                name: "Markup Raw",
                scope: "markup.raw",
                settings: {
                  foreground: accent7
                }
              }
            ]
          },
          null,
          2
        )
      )
    });
  });

const renderInstructions = paths => {
  const packageDirectory = paths.filter(p => p.includes('package.json')).map(path.dirname)[0];
  const files = paths.map(p => path.basename(p));
  const themeNames = [
    files.includes('themer-dark-color-theme.json') && '"Themer Dark"',
    files.includes('themer-light-color-theme.json') && '"Themer Light"',
  ].filter(Boolean);
  return `
Copy (or symlink) the generated package directory into the VS Code extensions directory:

    cp -R '${packageDirectory}' ~/.vscode/extensions/

Then reload or restart VS Code. The generated theme package should be in the list of installed extensions, and ${themeNames.join(' / ')} will be available in the list of themes.
  `;
};

module.exports = {
  render,
  renderInstructions,
};

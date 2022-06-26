//=============================================================================
// Plugin for RPG Maker MZ
// ChangeSelectItemWindowMZ.js
//=============================================================================
// [Update History]
// 2020.Dec.XX Ver0.0.0 In spite of this is launch plugin, it doesn't work
// 2021.Sep.12 Ver1.0.0 It works.

/*:
 * @target MZ
 * @plugindesc Change the various settings of item selecting window.
 * @author Sasuke KANNAZUKI
 *
 * @param Switch ID
 * @text Switch To Work
 * @desc this plugin's setting is valid if and only if the switch is ON.
 * @type switch
 * @default 1
 *
 * @param Max Columns
 * @desc the number of the max columns. System setting is 2.
 * @type number
 * @min 1
 * @default 1
 *
 * @param Visible Rows
 * @desc the number of visible rows. System setting is 4.
 * @type number
 * @max 12
 * @min 1
 * @default 8
 *
 * @param X position
 * @desc windows x position. Set -1 to be default setting.
 * @type number
 * @min -1
 * @default -1
 *
 * @param Y position
 * @desc windows y position. Set -1 to be default setting.
 * @type number
 * @min -1
 * @default -1
 *
 * @param Width
 * @text Window Width
 * @desc windows width. Set -1 to be default setting.
 * @type number
 * @min -1
 * @default -1
 *
 * @command rows
 * @text Change Rows
 * @desc Change rows number
 *
 * @arg value
 * @text Rows number
 * @type number
 * @min 1
 * @default 1
 *
 * @command cols
 * @text Change Columns
 * @desc Change colomns number
 *
 * @arg value
 * @text Column number
 * @type number
 * @min 1
 * @default 1
 *
 * @command x
 * @text Window X
 * @desc Change X-coord of the window
 *
 * @arg value
 * @text X-coord of the window.
 * Set -1 to be default value.
 * @type number
 * @min -1
 * @default -1
 *
 * @command y
 * @text Window Y
 * @desc Change Y-coord of the window
 *
 * @arg value
 * @text Y-coord of the window.
 * Set -1 to be default value.
 * @type number
 * @min -1
 * @default -1
 *
 * @command width
 * @text Window Width
 * @desc Change width of the window
 *
 * @arg value
 * @text Width of the window.
 * Set -1 to be default value.
 * @type number
 * @min -1
 * @default -1
 *
 * @command reset
 * @text Reset
 * @desc Reset all change of the window
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin changes the rect of Item Select Window.
 *
 * At event command 'Select Item', Item Select Window appears.
 *
 * [Summary]
 * When specified switch is ON and run 'Select Item',
 * it displays window set in the plugin.
 * 
 * [Plugin Commands]
 * Plugin Command enables to change properties set in the parameters.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc 『アイテム選択の処理』のウィンドウ設定を変更します
 * @author 神無月サスケ
 *
 * @param Switch ID
 * @text 作動スイッチID
 * @desc このIDのスイッチがONの時だけ、設定が働きます。
 * @type switch
 * @default 1
 *
 * @param Visible Rows
 * @text 最大行数
 * @desc 表示する行数です。通常のシステムでは4行です。
 * @type number
 * @min 1
 * @max 12
 * @default 8
 *
 * @param Max Columns
 * @text 最大カラム数
 * @desc 1行に表示する表示する列数です。通常のシステムでは2列です。
 * @type number
 * @min 1
 * @default 1
 *
 * @param X position
 * @text 左上X座標
 * @desc ウィンドウの左上のX座標です。-1を指定するとデフォルトの値になります。
 * @type number
 * @min -1
 * @default -1
 *
 * @param Y position
 * @text 左上Y座標
 * @desc ウィンドウの左上のY座標です。-1を指定するとデフォルトの値になります。
 * @type number
 * @min -1
 * @default -1
 *
 * @param Width
 * @text ウィンドウ幅
 * @desc ウィンドウの幅の長さです。-1を指定するとデフォルトの値になります。
 * @type number
 * @min -1
 * @default -1
 *
 * @command rows
 * @text 行数変更
 * @desc ウィンドウの行数を変更
 *
 * @arg value
 * @text 行数
 * @type number
 * @min 1
 * @default 1
 *
 * @command cols
 * @text 列数変更
 * @desc １行に表示する要素数を変更
 *
 * @arg value
 * @text １行に表示する要素数
 * @type number
 * @min 1
 * @default 1
 *
 * @command x
 * @text X座標変更
 * @desc ウィンドウのX座標を変更。
 *
 * @arg value
 * @text X座標
 * @desc 左上座標を指定。-1でデフォルトに
 * @type number
 * @min -1
 * @default -1
 *
 * @command y
 * @text Y座標変更
 * @desc ウィンドウのY座標を変更。
 *
 * @arg value
 * @text Y座標
 * @desc 左上座標を指定。-1でデフォルトに
 * @type number
 * @min -1
 * @default -1
 *
 * @command width
 * @text 幅変更
 * @desc ウィンドウ幅を変更
 *
 * @arg value
 * @text 幅
 * @desc 横の長さを指定。-1でデフォルトに
 * @type number
 * @min -1
 * @default -1
 *
 * @command reset
 * @text リセット
 * @desc プラグインコマンドで指定した全てをリセットします。
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、『アイテム選択の処理』の際に呼び出されるウィンドウの
 * 行数や幅や表示座標を変更します
 *
 * ■概要
 * オプションの「作動スイッチID」がONの時に、アイテム選択の処理を行うと、
 * このプラグインで設定した状態で選択ウィンドウが表示されます。
 * 
 * ■プラグインコマンド
 * 途中でウィンドウの位置や幅を変更したい時に
 * 呼び出してください。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'ChangeSelectItemWindowMZ';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const switchID = Number(parameters['Switch ID'] || 1);
  const _cols = Number(parameters['Max Columns'] || 1);
  const _rows = Number(parameters['Visible Rows'] || 8);
  const _wx = Number(parameters['X position'] || -1);
  const _wy = Number(parameters['Y position'] || -1);
  const _width = Number(parameters['Width'] || -1);

  //
  // initialize
  //
  Game_System.prototype.initChangeSelectItemSetting = function () {
    this._colsItemSelWnd = null;
    this._rowsItemSelWnd = null
    this._wxItemSelWnd = null;
    this._wyItemSelWnd = null;
    this._widthItemSelWnd = null;
  };

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_initialize.call(this);
    this.initChangeSelectItemSetting();
  };

  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, 'rows', args => {
    $gameSystem._rowsItemSelWnd = +args.value;
  });

  PluginManager.registerCommand(pluginName, 'cols', args => {
    $gameSystem._colsItemSelWnd = +args.value;
  });

  PluginManager.registerCommand(pluginName, 'x', args => {
    $gameSystem._wxItemSelWnd = +args.value;
  });

  PluginManager.registerCommand(pluginName, 'y', args => {
    $gameSystem._wyItemSelWnd = +args.value;
  });

  PluginManager.registerCommand(pluginName, 'width', args => {
    $gameSystem._widthItemSelWnd = +args.value;
  });

  PluginManager.registerCommand(pluginName, 'rest', args => {
    $gameSystem.initChangeSelectItemSetting();
  });
  //
  // variable manipulate routine
  //
  const cols = () => $gameSystem._colsItemSelWnd || _cols;

  const rows = () => $gameSystem._rowsItemSelWnd || _rows;

  const wx = () => $gameSystem._wxItemSelWnd || _wx;

  const wy = () => $gameSystem._wyItemSelWnd || _wy;

  const width = () => $gameSystem._widthItemSelWnd || _width;

  //
  // set windows rect
  //
  const _Scene_Message_eventItemWindowRect = 
    Scene_Message.prototype.eventItemWindowRect;
  Scene_Message.prototype.eventItemWindowRect = function() {
    if ($gameSwitches.value(switchID)){
      const wx2 = wx() >= 0 ? wx() : 0;
      const wy2 = wy() >= 0 ? wy() : 0;
      const ww2 = width() >= 0 ? width() : Graphics.boxWidth;
      const wh2 = this.calcWindowHeight(Math.max(rows(), 1), true);
      return new Rectangle(wx2, wy2, ww2, wh2);
    }
    return _Scene_Message_eventItemWindowRect.call(this);
  };

  //
  // set max cols
  //
  const _Window_EventItem_maxCols = Window_EventItem.prototype.maxCols;
  Window_EventItem.prototype.maxCols = function() {
    if($gameSwitches.value(switchID)){
      return Math.max(cols(), 1);
    } else {
      return _Window_EventItem_maxCols.call(this);
    }
  };

  //
  // specified position is fixed
  //
  const _Window_EventItem_updatePlacement = 
   Window_EventItem.prototype.updatePlacement;
  Window_EventItem.prototype.updatePlacement = function() {
    const rect = Scene_Message.prototype.eventItemWindowRect();
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    // Since window size changes, needs to recreate contents.
    this.createContents();
    this.refresh();
    if (!$gameSwitches.value(switchID)) {
      _Window_EventItem_updatePlacement.call(this);
    }
  };

})();

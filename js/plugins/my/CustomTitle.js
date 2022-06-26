//=============================================================================
// RPG Maker MZ - Text Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Custom title
 * @author Xiuxiu
 *
 * @help Custom.js
 *
 * Costom plubin.
 *
 * Use it in the following procedure.
 *   1. Balabalalalala.
 *   2. Balalalalalala2.
 *
 * @command set
 * @text Custom Title
 * @desc Given a test
 *       To define a Title
 *
 * @arg text1
 * @type string
 * @text Text
 * @desc display as a title.
 *       Control characters are allowed.
 */

(() => {
    const pluginName = "CustomTitle";

    PluginManager.registerCommand(pluginName, "set", args => {
        // const text = args.text1;
        alert(args.text1)
    });


})();

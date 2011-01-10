/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Kevin Dangoor (kdangoor@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

var config = {
    packagePaths: {
        "../lib": [
            { name:"ace", lib: "." }
        ],
        "../support/cockpit/lib": [
            { name: "cockpit", main: "index", lib: "." }
        ],
        "../support/cockpit/support/pilot/lib": [
            { name: "pilot", main: "index", lib: "." }
        ]
    },
    paths: { demo_startup: "../demo/demo_startup" }
};

var deps = [ "pilot/fixoldbrowsers", "pilot/plugin_manager", "pilot/settings",
             "pilot/environment", "demo_startup" ];

require(config, deps, function() {
    var catalog = require("pilot/plugin_manager").catalog;
    catalog.registerPlugins([ "pilot/index", "cockpit/index" ]).then(function() {
        var env = require("pilot/environment").create();
        catalog.startupPlugins({ env: env }).then(function() {
            require("demo_startup").launch(env);
        });
    });
});

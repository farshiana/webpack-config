import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Log from "Helpers/log";
import "Styles/style.scss";
import 'Assets/appicon-48.png';
import 'Assets/appicon-144.png';
import 'Assets/appicon-192.png';
import 'Assets/appicon-256.png';
import 'Assets/appicon-512.png';

// Test helper
Log.environment();

// Install service worker
OfflinePluginRuntime.install();

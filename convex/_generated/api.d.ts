/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ads from "../ads.js";
import type * as contacts from "../contacts.js";
import type * as credits from "../credits.js";
import type * as migrations_update_ad_limits from "../migrations/update_ad_limits.js";
import type * as notifications from "../notifications.js";
import type * as product from "../product.js";
import type * as settings from "../settings.js";
import type * as sms from "../sms.js";
import type * as social_media_analytics from "../social_media_analytics.js";
import type * as teams from "../teams.js";
import type * as templates from "../templates.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ads: typeof ads;
  contacts: typeof contacts;
  credits: typeof credits;
  "migrations/update_ad_limits": typeof migrations_update_ad_limits;
  notifications: typeof notifications;
  product: typeof product;
  settings: typeof settings;
  sms: typeof sms;
  social_media_analytics: typeof social_media_analytics;
  teams: typeof teams;
  templates: typeof templates;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

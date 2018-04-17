console.log("start here")

import { schedule, danger } from "danger";
import { IncomingWebhook } from "@slack/client";
import { Issues } from "github-webhook-event-types"

declare const peril: any // danger/danger#351
const gh = danger.github as any as Issues
const issue = gh.issue
const repo = gh.repository
const text = (issue.title + issue.body).toLowerCase()
const api = danger.github.api

console.log("end test");

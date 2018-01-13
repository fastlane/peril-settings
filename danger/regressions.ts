import { schedule, danger } from "danger";
import { IncomingWebhook } from "@slack/client";
import { Issues } from "github-webhook-event-types"

declare const peril: any // danger/danger#351
const gh = danger.github as any as Issues
const issue = gh.issue
const text = (issue.title + issue.body).toLowerCase()
const api = danger.github.api


if (text.includes("regression")) {
  var url = peril.env.SLACK_WEBHOOK_URL || "";
  var webhook = new IncomingWebhook(url);
  schedule( async () => {
   await webhook.send({
      unfurl_links: false,
      attachments: [{
        pretext: "New PR/Issue containing the word 'regression'",
        color: "error",
        title: issue.title,
        title_link: issue.html_url,
        author_name: issue.user.login,
        author_icon: issue.user.avatar_url
      }]
    })

    await api.issues.addLabels({
      owner: issue.owner,
      repo: issue.repo,
      number: issue.number,
      labels: ["status: regression"]
    })
  });
}

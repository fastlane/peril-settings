import { schedule, danger } from "danger";
import { IncomingWebhook } from "@slack/client";
import { Issues } from "github-webhook-event-types"

declare const peril: any // danger/danger#351
const gh = danger.github as any as Issues
const issue = gh.issue
const repo = gh.repository
var text = (issue.title + issue.body).toLowerCase()
const api = danger.github.api

const startMarker = "<!-- start regression question -->"
const endMarker = "<!-- end regression question -->"

var start = text.indexOf(startMarker);
var end = text.indexOf(endMarker)

var hasRegressionChecked = false;

if (start !== -1 && end !== -1) {
  end = end + endMarker.length
  
  var regressionQuestion = text.substring(start, end);
  
  if (regressionQuestion.includes("- [x] Yes")) {
   hasRegressionChecked = true;
  }
  
  console.log("text before: " + text);
  text = text.replace(ignoreContent, '');
  console.log("text after: " + text);
}

console.log("hasRegressionChecked", hasRegressionChecked);
console.log("text includes", text.includes("regression"));

if (hasRegressionChecked || text.includes("regression")) {
  console.log("IT HAS A REGRESSION");
  var url = peril.env.SLACK_WEBHOOK_URL || "";
  var webhook = new IncomingWebhook(url);
  schedule( async () => {
   await webhook.send({
      unfurl_links: false,
      attachments: [{
        pretext: "New PR/Issue containing the word 'regression'",
        color: "danger",
        title: issue.title,
        title_link: issue.html_url,
        author_name: issue.user.login,
        author_icon: issue.user.avatar_url,
//         channel: "C0RNLRLG6"
      }]
    })

    await api.issues.addLabels({
      owner: repo.owner.login,
      repo: repo.name,
      number: issue.number,
      labels: ["status: regression"]
    })
  });
}

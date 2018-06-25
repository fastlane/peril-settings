import {schedule, danger} from "danger";
import {gh, repo, api} from './regressions'

declare const peril : any
const gh = danger.github
const pr = gh.pr
const repo = gh.repository
const api = danger.github.api
const pr_date = pr.created_at
const now = new Date()
const weekAgo = now.setDate(now.getDay() - 7)

if (Date.parse(pr_date) < weekAgo) {
    schedule(async() => {
        await api
            .pr
            .addLabels({owner: repo.owner.login, repo: repo.name, number: pr.number, labels: ["needs attention"]})
    });
}

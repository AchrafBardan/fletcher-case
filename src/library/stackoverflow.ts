import { Tag } from "../App.vue";

async function getTags(query: string, max: number): Promise<Array<any>> {
    return (await createRequest('tags', {
        "inname": query,
        "pagesize": max
    })).items as Array<any>
}

async function getQuestions(tags: Array<Tag>): Promise<Array<any>> {
    return (await createRequest('questions', {
        "tagged": tags.map(tag => tag.name).join(';'),
        "pagesize": 10
    })).items as Array<any>
}

async function createRequest(endpoint: 'tags'|'questions', data: Record<string, any> = {}): Promise<any> {
    data.site = 'stackoverflow'
    const url = new URL(`${getUrl()}/${endpoint}?${(new URLSearchParams(data).toString())}`)

    return await (await fetch(url)).json()
}

function getUrl (): string {
    return "https://api.stackexchange.com/2.3"
}

export {
    getTags,
    getQuestions
}
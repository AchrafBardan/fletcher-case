async function getTags(query: string, max: number): Promise<Array<Tag>> {
    return (await createRequest('tags', {
        "inname": query,
        "pagesize": max
    })).items
}

async function getQuestions(tags: Array<Tag>): Promise<Array<Question>> {
    return (await createRequest('questions', {
        "tagged": tags.map(tag => tag.name).join(';'),
        "pagesize": 10
    })).items
}

async function createRequest(endpoint: 'tags'|'questions', data: Record<string, any> = {}): Promise<any> {
    data.site = 'stackoverflow'
    const url = new URL(`${getUrl()}/${endpoint}?${(new URLSearchParams(data).toString())}`)

    return await (await fetch(url)).json()
}

function getUrl (): string {
    return "https://api.stackexchange.com/2.3"
}

export type Tag = {
    name: string;
    count: number;
}

export type Question = {
    "answer_count": number,
    "link": string,
    "title": string,
    "tags": Array<string>,
    "owner": {
        "display_name": string,
        "link": string
    }
}

export {
    getTags,
    getQuestions,
}
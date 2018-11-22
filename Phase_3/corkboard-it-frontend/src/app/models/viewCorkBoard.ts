import { User } from "./user";

export class ViewCorkBoard {
    owner: User
    stat: ViewCorkBoardStat
    images: PushpinImage[]
}

export class ViewCorkBoardStat {
    title: string
    category: string
    date: string
    count: number
    email: string
    visibility: boolean
}

export class PushpinImage {
    url: string
    pushpin_id: number
}


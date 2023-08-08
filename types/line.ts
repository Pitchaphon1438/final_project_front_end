import {$fetch} from "ohmyfetch";
import {useRuntimeConfig} from "#imports";
import {$axios} from "~/plugins/axios";

export interface ILineIssueAccessTokenRequest {
    grant_type: string;
    code: string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
    code_verifier?: string;
    state?: string;
}

export interface ILineIssueAccessTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export const LineIssueAccessToken = (request: ILineIssueAccessTokenRequest) => {

    let data = new URLSearchParams();

    data.append("grant_type", request.grant_type)
    data.append("code", request.code)
    data.append("redirect_uri", request.redirect_uri)
    data.append("client_id", request.client_id)
    data.append("client_secret", request.client_secret)
    if (request.code_verifier) {
        data.append("code_verifier", request.code_verifier)
    }


    return $fetch("https://api.line.me/oauth2/v2.1/token", {
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        "body": data
    })
}

export const BackendLineIssueAccessToken = (request: ILineIssueAccessTokenRequest) => {

    return $axios.post(`/callback/line`, request)
}
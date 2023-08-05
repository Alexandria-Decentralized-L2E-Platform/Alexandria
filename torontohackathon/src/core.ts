import { Dispatch } from "react";
import Web3 from "web3";

export var w3:Web3|null = null;

function hasEthereum(): boolean {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

export async function isConnected():Promise<boolean> {
    return !!window.ethereum.isConnected();
}

export async function connect(){
    if (hasEthereum()) {
        let web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        //dispatch({type:"PROVIDER_LOADED", connection:web3})
        w3 = web3;
    } else {
        // web3 is not available
        console.log("no MM")
    }
}

export async function getSelfAddress() {
    if (!isConnected() || !w3) return "";
    let addresses = await w3.eth.getAccounts();
    return addresses[0];
}
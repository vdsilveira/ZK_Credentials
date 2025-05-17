
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CredentialsData {

    struct CNH_Proves {
        bytes validaty;
        bytes category;
        bytes cpf;
        bytes birthday;
    }

    struct CNH_Plaintext {
        uint32 validaty;
        string category;
        uint32 cpf;
        uint32 birthday;
    }

    // Mapeamentos de endereço para provas e informações em texto claro
    mapping (address => CNH_Proves) private _Proves;
    mapping (address => CNH_Plaintext) private _UserInfo;

    // Função para registrar as provas criptografadas (ex: ZK-SNARKs, hashes, etc)
// Prova e valor em texto claro para CPF
function set_cnh_cpf(bytes memory cpf_prove, uint32 cnh_cpf) public {
    _Proves[msg.sender].cpf = cpf_prove;
    _UserInfo[msg.sender].cpf = cnh_cpf;
}

// Prova e valor em texto claro para validade
function set_cnh_validaty(bytes memory validaty_prove, uint32 cnh_validaty) public {
    _Proves[msg.sender].validaty = validaty_prove;
    _UserInfo[msg.sender].validaty = cnh_validaty;
}

// Prova e valor em texto claro para categoria
function set_cnh_category(bytes memory category_prove, string memory cnh_category) public {
    _Proves[msg.sender].category = category_prove;
    _UserInfo[msg.sender].category = cnh_category;
}

// Prova e valor em texto claro para data de nascimento
function set_cnh_birthday(bytes memory birthday_prove, uint32 cnh_birthday) public {
    _Proves[msg.sender].birthday = birthday_prove;
    _UserInfo[msg.sender].birthday = cnh_birthday;
}


    // Funções getters adicionais 
    function getProves(address user) public view returns (CNH_Proves memory) {
        return _Proves[user];
    }

    function getUserInfo(address user) public view returns (CNH_Plaintext memory) {
        return _UserInfo[user];
    }



}

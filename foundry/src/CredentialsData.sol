
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
    function setProves(
        bytes memory validaty_prove,
        bytes memory category_prove,
        bytes memory cpf_prove,
        bytes memory birthday_prove
    ) public {
        _Proves[msg.sender] = CNH_Proves({
            validaty: validaty_prove,
            category: category_prove,
            cpf: cpf_prove,
            birthday: birthday_prove
        });
    }

    // Função para registrar informações em texto claro (para fins de exemplo ou comparação)
    function setInfo(
        uint32 cnh_validaty,
        string memory cnh_category,
        uint32 cnh_cpf,
        uint32 cnh_birthday
    ) public {
        _UserInfo[msg.sender] = CNH_Plaintext({
            validaty: cnh_validaty,
            category: cnh_category,
            cpf: cnh_cpf,
            birthday: cnh_birthday
        });
    }

    // Funções getters adicionais 
    function getProves(address user) public view returns (CNH_Proves memory) {
        return _Proves[user];
    }

    function getUserInfo(address user) public view returns (CNH_Plaintext memory) {
        return _UserInfo[user];
    }



}

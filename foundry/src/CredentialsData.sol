// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CredentialsData {

    struct CNH_Plaintext {
        uint32 validaty;
        string category;
        uint32 cpf;
        uint32 birthday;
    }

    // Mapeamentos de endereço para provas e informações em texto claro
    mapping (address => string) private _cpf_Proves;
    mapping (address => string) private _validaty_Proves;
    mapping (address => string) private _category_Proves;
    mapping (address => string) private _birthday_Proves;
    mapping (address => CNH_Plaintext) private _UserInfo;

   
    // Prova e valor em texto claro para CPF
    function set_cnh_cpf(string memory cpf_prove, uint32 cnh_cpf) public {
        _cpf_Proves[msg.sender] = cpf_prove;
        _UserInfo[msg.sender].cpf = cnh_cpf;
    }

    // Prova e valor em texto claro para validade
    function set_cnh_validaty(string memory validaty_prove, uint32 cnh_validaty) public {
        _validaty_Proves[msg.sender] = validaty_prove;
        _UserInfo[msg.sender].validaty = cnh_validaty;
    }

    // Prova e valor em texto claro para categoria
    function set_cnh_category(string memory category_prove, string memory cnh_category) public {
        _category_Proves[msg.sender] = category_prove;
        _UserInfo[msg.sender].category = cnh_category;
    }

    // Prova e valor em texto claro para data de nascimento
    function set_cnh_birthday(string memory birthday_prove, uint32 cnh_birthday) public {
        _birthday_Proves[msg.sender] = birthday_prove;
        _UserInfo[msg.sender].birthday = cnh_birthday;
    }

    // Funções get para cada prova individualmente
    function get_cpf_prove(address user) public view returns (string memory) {
        return _cpf_Proves[user];
    }

    function get_validaty_prove(address user) public view returns (string memory) {
        return _validaty_Proves[user];
    }

    function get_category_prove(address user) public view returns (string memory) {
        return _category_Proves[user];
    }

    function get_birthday_prove(address user) public view returns (string memory) {
        return _birthday_Proves[user];
    }

    // Função para retornar todas as provas juntas (como struct)
    struct CNH_Proves {
        string cpf_prove;
        string validaty_prove;
        string category_prove;
        string birthday_prove;
    }

    function getProves(address user) public view returns (CNH_Proves memory) {
        return CNH_Proves({
            cpf_prove: _cpf_Proves[user],
            validaty_prove: _validaty_Proves[user],
            category_prove: _category_Proves[user],
            birthday_prove: _birthday_Proves[user]
        });
    }

    function getUserInfo(address user) public view returns (CNH_Plaintext memory) {
        return _UserInfo[user];
    }
}

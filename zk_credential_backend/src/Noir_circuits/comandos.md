
# Passos de geração de prova no Noir:

### 1 - criar diretório de prova:
```
nargo new "Validity_proof"
```
### 2 - Compilar prova:
```
cd Validity_proof
nargo check
```


### 3 - configurar Prover.toml:

  _obs: Prover.toml gerado em ./Validity_proof, parâmetros da circuito_ 
```
emission = "20230917"
today = "20250515"
```
### 4 - Gerar testemunha:
```
nargo execute
```
_sera criado os arquivos **Validity_proof.gz** e **Validity_proof**.json no diretório target_

### 5 - Gerar prova:
_Com o circuito compilado e a testemunha gerada, estamos prontos para provar._
```
bb prove -b ./target/Validity_proof.json -w ./target/Validity_proof.gz -o ./target
```
```
bb prove --scheme ultra_honk -b ./target/Validity_proof.json -w ./target/Valid
ity_proof.gz -o ./target/proof
```
### decompactar .gz

```
nzip -c ./Validity_proof/target/Validity_proof.gz > ./Validity_proof/target/Validity_proof.acir
```
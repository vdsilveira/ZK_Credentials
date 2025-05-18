import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockKeyhole, ArrowLeft, Shield, Key, FileCheck, Code, Globe, Users, Lightbulb } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LockKeyhole className="h-8 w-8 text-black" />
            <span className="text-2xl font-bold tracking-tight text-black">ZKCredential</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/learn">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Sobre
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Documentação
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Contato
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">zkCredential</h1>
          <p className="text-xl text-gray-600 mb-8">Privacidade, identidade e confiança para a Web3.</p>
          <div className="w-24 h-1 bg-black mx-auto rounded-full mb-12"></div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Sobre o Projeto</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                O zkCredential é uma solução inovadora construída durante o Hackathon da NearX, em parceria com a
                ZKVerify, com o objetivo de trazer verificação de credenciais descentralizada e privada, utilizando
                provas de conhecimento zero (ZKPs).
              </p>
              <p>
                Na prática, ele permite que usuários provem informações sobre si mesmos — como ter um diploma, idade
                mínima ou certificação — sem revelar os dados diretamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Key className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Como funciona?</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Combinando tecnologia ZK (Zero-Knowledge Proofs) e a infraestrutura da Near Protocol, o zkCredential
                permite:
              </p>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 my-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                    <span>Verificações seguras de identidade;</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                    <span>Preservação total da privacidade do usuário;</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-6 w-6 text-black mr-3 mt-1 flex-shrink-0" />
                    <span>Interoperabilidade com dApps, DAOs e plataformas Web3.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Diagram */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Arquitetura Técnica</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="border border-gray-300 rounded-lg p-4 text-center bg-white shadow-sm">
                      <p className="font-semibold">Usuário</p>
                      <p className="text-sm text-gray-600">Documento + Carteira</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-full h-0.5 bg-black"></div>
                      <div className="text-xs text-gray-500">Submete</div>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 text-center bg-white shadow-sm">
                      <p className="font-semibold">ZKVerify</p>
                      <p className="text-sm text-gray-600">Geração de Provas</p>
                    </div>
                    <div className="col-start-3 flex items-center justify-center">
                      <div className="h-full w-0.5 bg-black"></div>
                      <div className="text-xs text-gray-500">Gera</div>
                    </div>
                    <div className="col-start-3 border border-gray-300 rounded-lg p-4 text-center bg-white shadow-sm">
                      <p className="font-semibold">Credencial ZKP</p>
                      <p className="text-sm text-gray-600">Prova Criptográfica</p>
                    </div>
                    <div className="col-start-3 flex items-center justify-center">
                      <div className="h-full w-0.5 bg-black"></div>
                      <div className="text-xs text-gray-500">Armazena</div>
                    </div>
                    <div className="col-start-2 col-span-2 border border-gray-300 rounded-lg p-4 text-center bg-white shadow-sm">
                      <p className="font-semibold">NEAR Protocol</p>
                      <p className="text-sm text-gray-600">Armazenamento Descentralizado</p>
                    </div>
                    <div className="col-start-1 col-span-3 border border-gray-300 rounded-lg p-4 text-center bg-white shadow-sm">
                      <p className="font-semibold">Aplicações Web3</p>
                      <p className="text-sm text-gray-600">dApps, DAOs, Plataformas Descentralizadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Quem está por trás?</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                O projeto foi idealizado e desenvolvido por Vinicius, desenvolvedor blockchain apaixonado por
                criptografia e privacidade. Atuando como time solo sob o nome Solo Builders, ele abraçou o desafio de
                construir uma solução completa, do smart contract ao front-end, integrando com ZKVerify e o ecossistema
                NEAR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Hackathon NearX x ZKVerify</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                zkCredential nasceu no contexto do hackathon promovido pela NearX, com foco em soluções ZK-friendly e
                user-centric. A colaboração com a ZKVerify impulsionou a integração de provas criptográficas robustas,
                garantindo a validade e segurança das credenciais usadas na plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <FileCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Visão</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Capacitar indivíduos com controle total sobre sua identidade digital, reduzindo riscos de exposição de
                dados e promovendo confiança na Web3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In Construction Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Em construção...</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Esta é apenas a primeira versão do zkCredential. Continue acompanhando para ver os próximos passos e
                como você poderá integrá-lo ao seu dApp ou projeto descentralizado.
              </p>
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/create">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  Experimentar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <LockKeyhole className="h-6 w-6 text-black" />
              <span className="text-xl font-bold tracking-tight text-black">ZKCredential</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 text-center md:text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Produto</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/features" className="hover:text-black">
                      Funcionalidades
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-black">
                      Preços
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-black">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Recursos</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/docs" className="hover:text-black">
                      Documentação
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="hover:text-black">
                      Guias
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="hover:text-black">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Empresa</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/learn" className="hover:text-black">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-black">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-black">
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} ZKCredential. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

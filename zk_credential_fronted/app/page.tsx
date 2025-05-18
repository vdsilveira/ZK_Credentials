import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Key, FileCheck, LockKeyhole, ChevronRight } from "lucide-react"

export default function Home() {
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Credenciais Verificáveis com Privacidade Garantida
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforme seus documentos em credenciais digitais verificáveis sem comprometer sua privacidade, usando
              tecnologia Zero-Knowledge Proof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  Começar Agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative w-64 h-64">
                <div className="absolute top-0 left-0 w-full h-full bg-black/5 rounded-lg transform rotate-6"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg border border-gray-200 shadow-lg p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                      <LockKeyhole className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Credencial ZKP</h3>
                    <p className="text-sm text-gray-500">Emitido para: João da Silva</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">Válido até: 01/01/2025</div>
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforme seus documentos em credenciais digitais verificáveis em três passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl">Conecte sua Carteira</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Conecte sua carteira MetaMask para vincular suas credenciais a um identificador único e seguro.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-1 bg-gradient-to-r from-black to-gray-400 rounded-full"></div>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl">Crie sua Credencial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Faça upload da sua CNH para criar credenciais ZKP ou recupere provas existentes para verificação.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-1 bg-gradient-to-r from-black to-gray-400 rounded-full"></div>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl">Use com Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Utilize suas credenciais verificáveis em outros sistemas que aceitam provas zero-knowledge.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-1 bg-gradient-to-r from-black to-gray-400 rounded-full"></div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-6 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-70"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-black/5 h-full"></div>
              ))}
            </div>
            <div className="grid grid-rows-12 w-full absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-b border-black/5 w-full"></div>
              ))}
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-black/10"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`node-${i}`}
                className="absolute w-2 h-2 bg-black/10 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute h-px bg-black/10"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Gerar Credencial ZKP</CardTitle>
              <CardDescription className="text-gray-600">
                Gere provas zero-knowledge a partir da sua CNH e vincule à sua carteira MetaMask
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Faça upload da sua CNH, extraia os dados e gere provas criptográficas que podem ser verificadas sem
                revelar seus dados pessoais.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/create">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  Gerar Credencial
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Recuperar e Verificar</CardTitle>
              <CardDescription className="text-gray-600">
                Recupere e verifique provas existentes vinculadas a uma carteira MetaMask
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Insira um endereço de carteira, selecione o tipo de prova e verifique a autenticidade das credenciais
                sem comprometer a privacidade.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/verify">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                  Verificar Provas
                </Button>
              </Link>
            </CardFooter>
          </Card>
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

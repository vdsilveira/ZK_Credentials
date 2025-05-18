import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LockKeyhole, ArrowLeft, Linkedin, Github, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
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

      {/* Contact Section */}
      <section className="py-12 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">Entre em Contato</h1>
            <div className="w-24 h-1 bg-black mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão sobre o zkCredential? Entre em contato diretamente com o desenvolvedor.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-black mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfil-0wJK4y7B9v1z1vM5u5kGx5NqTlksls.jpeg"
                alt="Vinicius Duarte Silveira"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vinicius Duarte Silveira</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Desenvolvedor blockchain apaixonado por criptografia e privacidade. Criador do zkCredential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
              <a
                href="https://www.linkedin.com/in/vdsilveira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white border border-gray-200 hover:border-black rounded-lg p-4 transition-all duration-200 hover:shadow-md"
              >
                <Linkedin className="h-6 w-6 text-[#0077B5]" />
                <span className="font-medium">LinkedIn</span>
              </a>

              <a
                href="https://github.com/vdsilveira"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-white border border-gray-200 hover:border-black rounded-lg p-4 transition-all duration-200 hover:shadow-md"
              >
                <Github className="h-6 w-6 text-black" />
                <span className="font-medium">GitHub</span>
              </a>

              <div className="flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-lg p-4 md:col-span-2">
                <Mail className="h-6 w-6 text-gray-600" />
                <span className="font-medium">contato@zkcredential.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Digite sua mensagem aqui..."
                  ></textarea>
                </div>

                <div>
                  <Button className="w-full bg-black hover:bg-gray-800 text-white py-3">Enviar Mensagem</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-black mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Localização</h2>
            </div>
            <p className="text-gray-600 mb-8">
              O projeto zkCredential é desenvolvido no Brasil, com foco em soluções globais para privacidade e
              identidade digital.
            </p>
            <div className="aspect-[16/9] bg-gray-200 rounded-xl overflow-hidden">
              {/* Placeholder para um mapa ou imagem representativa */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Mapa do Brasil</p>
              </div>
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

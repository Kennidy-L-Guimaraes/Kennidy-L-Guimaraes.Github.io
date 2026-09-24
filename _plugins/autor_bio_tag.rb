module Jekyll
  module AutorLookup
    def self.normalizar(texto)
      texto.to_s.dup.force_encoding("UTF-8")
           .unicode_normalize(:nfd).gsub(/\p{Mn}/, "")
           .downcase.gsub(/[\s_\-]+/, "")
    end

    # Devolve o nome do arquivo em `pasta` cujo nome (sem extensão)
    # casa com `nome_autor`, restrito às extensões dadas (ou qualquer uma).
    def self.achar(pasta, nome_autor, extensoes = nil)
      return nil unless Dir.exist?(pasta)
      alvo = normalizar(nome_autor)

      Dir.entries(pasta).sort.each do |arquivo|
        next if arquivo.start_with?(".")
        ext = File.extname(arquivo).delete(".").downcase
        next if extensoes && !extensoes.include?(ext)
        return arquivo if normalizar(File.basename(arquivo, ".*")) == alvo
      end
      nil
    end
  end

  class AutorBioTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      nome_autor = context[@markup].to_s.strip
      return "" if nome_autor.empty?

      site = context.registers[:site]
      pasta = File.join(site.source, "files", "authors", "description")

      %w[txt md].each do |extensao|
        arquivo = AutorLookup.achar(pasta, nome_autor, [extensao])
        return File.read(File.join(pasta, arquivo), encoding: "utf-8") if arquivo
      end

      ""
    end
  end

  class AutorFotoTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      nome_autor = context[@markup].to_s.strip
      return "" if nome_autor.empty?

      site = context.registers[:site]
      pasta = File.join(site.source, "files", "authors", "img")

      arquivo = AutorLookup.achar(pasta, nome_autor)
      arquivo ? "/files/authors/img/#{arquivo}" : ""
    end
  end
end

Liquid::Template.register_tag("autor_bio", Jekyll::AutorBioTag)
Liquid::Template.register_tag("autor_foto", Jekyll::AutorFotoTag)
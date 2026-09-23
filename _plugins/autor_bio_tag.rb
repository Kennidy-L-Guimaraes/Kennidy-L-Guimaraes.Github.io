module Jekyll
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

      ["txt", "md"].each do |extensao|
        caminho = File.join(pasta, "#{nome_autor}.#{extensao}")
        return File.read(caminho, encoding: "utf-8") if File.exist?(caminho)
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
      return "" unless Dir.exist?(pasta)

      alvo = normalizar(nome_autor)

      Dir.entries(pasta).sort.each do |arquivo|
        next if arquivo.start_with?(".")
        nome_sem_ext = File.basename(arquivo, ".*")
        return "/files/authors/img/#{arquivo}" if normalizar(nome_sem_ext) == alvo
      end

      ""
    end

    private

    def normalizar(texto)
      texto.downcase.gsub(/[\s_\-]+/, "")
    end
  end
end

Liquid::Template.register_tag("autor_bio", Jekyll::AutorBioTag)
Liquid::Template.register_tag("autor_foto", Jekyll::AutorFotoTag)
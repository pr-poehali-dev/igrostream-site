import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Rules = () => {
  const rules = [
    {
      icon: 'ShieldX',
      title: 'Запрет контента 18+',
      description: 'На платформе строго запрещена трансляция материалов для взрослых, включая эротический, порнографический контент и сцены насилия.',
      details: [
        'Запрещены откровенные изображения и видео',
        'Недопустим контент сексуального характера',
        'Запрещена демонстрация жестокости и насилия'
      ]
    },
    {
      icon: 'MessageSquareX',
      title: 'Запрет оскорблений',
      description: 'Мы создаем дружелюбное сообщество, где каждый чувствует себя комфортно. Любые формы оскорблений недопустимы.',
      details: [
        'Уважайте всех пользователей платформы',
        'Запрещены личные оскорбления и унижения',
        'Недопустима дискриминация по любым признакам',
        'Запрещен троллинг и провокации'
      ]
    },
    {
      icon: 'Users',
      title: 'Уважение к сообществу',
      description: 'Поддерживайте позитивную атмосферу и помогайте создавать приятную среду для всех участников.',
      details: [
        'Будьте вежливы в чате',
        'Помогайте новичкам',
        'Следуйте правилам каждого стрима',
        'Сообщайте модераторам о нарушениях'
      ]
    }
  ];

  const violations = [
    {
      level: 'Первое нарушение',
      action: 'Предупреждение',
      icon: 'AlertTriangle'
    },
    {
      level: 'Второе нарушение',
      action: 'Блокировка на 24 часа',
      icon: 'Clock'
    },
    {
      level: 'Третье нарушение',
      action: 'Блокировка на 7 дней',
      icon: 'Ban'
    },
    {
      level: 'Грубое нарушение',
      action: 'Постоянный бан',
      icon: 'ShieldAlert'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Radio" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IgroStream.live
              </h1>
            </Link>

            <Link to="/">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
              <Icon name="Shield" className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Правила платформы</h1>
            <p className="text-xl text-muted-foreground">
              Создаем безопасное и дружелюбное сообщество для всех стримеров
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {rules.map((rule, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={rule.icon as any} className="text-primary" size={24} />
                    </div>
                    <span className="text-xl">{rule.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{rule.description}</p>
                  <ul className="space-y-2">
                    {rule.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Gavel" className="text-primary" size={28} />
                Система наказаний
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                За нарушение правил применяется градуированная система наказаний:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {violations.map((violation, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={violation.icon as any} className="text-destructive" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{violation.level}</div>
                      <div className="text-sm text-muted-foreground">{violation.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-start gap-4">
              <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2 text-lg">Вопросы по правилам?</h3>
                <p className="text-muted-foreground mb-4">
                  Если у вас есть вопросы о правилах платформы или вы хотите сообщить о нарушении, 
                  свяжитесь с нашей службой поддержки.
                </p>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Связаться с поддержкой
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Radio" className="text-white" size={18} />
              </div>
              <span className="text-sm text-muted-foreground">© 2024 IgroStream.live</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/rules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Правила платформы
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Поддержка
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О нас
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Rules;

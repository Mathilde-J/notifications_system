# 📬 Notifications System

Système d'envoi de notifications multi-canal construit en **TypeScript**, conçu comme un exercice d'architecture logicielle. Le projet met en pratique plusieurs design patterns classiques (Observer, Decorator, Template Method) dans un contexte concret d'envoi de messages.

## Objectif

Centraliser l'envoi de différents types de messages (email, SMS, notification push, Slack) depuis une seule application, avec un système de logging et de retry intégré.

## Architecture

Le projet s'articule autour de trois couches principales :

```
backend/
├── config/           # Configuration (connexion base de données)
├── decorators/       # Decorator pattern (retry)
├── interfaces/       # Contrats Observer / Observable
├── repositories/     # Accès aux données (logs, messages)
├── services/         # Logique métier d'envoi de messages
│   └── messageSenders/
│       ├── baseSender.ts             # Classe abstraite commune
│       ├── messageSenderServices.ts  # Orchestrateur (Observable)
│       └── senders/                  # Implémentations par canal
│           ├── emailSender.ts
│           ├── smsSender.ts
│           ├── notificationSender.ts
│           └── slackSender.ts
├── types/            # Types TypeScript (Message, Log)
└── utils/            # Fixtures et messages d'erreur
```

## Design Patterns utilisés

### Observer

L'interface `Observable` / `Observer` permet de notifier automatiquement des services tiers (comme le logger) après chaque envoi de message, qu'il réussisse ou échoue. Le `MessageSenderService` joue le rôle d'Observable, et le `LoggerRepository` celui d'Observer.

### Decorator

Le `RetryDecorator` enveloppe n'importe quel `MessageSender` pour ajouter un mécanisme de retry (3 tentatives par défaut) de manière transparente, sans modifier le sender d'origine.

### Template Method

La classe `BaseSender` définit le squelette de l'envoi via la méthode publique `send()`, et délègue l'implémentation concrète à `sendMessage()` dans chaque sous-classe (EmailSender, SmsSender, etc.).

## Types de messages supportés

| Type         | Classe             | Champs spécifiques          |
|--------------|--------------------|-----------------------------|
| Email        | `EmailSender`      | `subject`, `email`          |
| SMS          | `SmsSender`        | `phoneNumber`               |
| Push         | `NotificationSender` | —                         |
| Slack        | `SlackSender`      | —                           |

Tous les messages partagent une base commune : `id`, `content`, `sentAt`, `sender`, `receivers`.

## Stack technique

- **TypeScript** 6.x
- **Vitest** pour les tests unitaires
- **tsx** pour l'exécution directe des fichiers `.ts`

## Installation

```bash
cd backend
npm install
```

## Utilisation

```bash
npx tsx index.ts
```

Cela envoie un email de test en utilisant le `RetryDecorator` et le `LoggerRepository` comme observer.

## Tests

```bash
npm test
```

Les tests couvrent :

- **Senders** — vérification que `send()` délègue bien à `sendMessage()` et propage les erreurs.
- **MessageSenderService** — abonnement/désabonnement d'observers, notification après envoi (succès et échec), isolation entre observers.
- **RetryDecorator** — retry après échecs, arrêt après succès, erreur finale si toutes les tentatives échouent.

## TODO

- Uniformiser la gestion des erreurs
- Implémenter le repository `Message` (actuellement commenté)
- Connecter une vraie base de données
- Ajouter des canaux d'envoi réels (SMTP, API Slack, etc.)

## Licence

ISC


import { Pattern } from './types';
import QueueAnimation from './components/patterns/animations/QueueAnimation';
import PublishSubscribeAnimation from './components/patterns/animations/PublishSubscribeAnimation';
import BrokerAnimation from './components/patterns/animations/BrokerAnimation';
import EventSourcingAnimation from './components/patterns/animations/EventSourcingAnimation';
import EventStreamingAnimation from './components/patterns/animations/EventStreamingAnimation';
import ChoreographyAnimation from './components/patterns/animations/ChoreographyAnimation';
import OrchestrationAnimation from './components/patterns/animations/OrchestrationAnimation';
import CqrsAnimation from './components/patterns/animations/CqrsAnimation';
import QueueDemo from './components/patterns/demos/QueueDemo';
import PublishSubscribeDemo from './components/patterns/demos/PublishSubscribeDemo';
import BrokerDemo from './components/patterns/demos/BrokerDemo';
import EventSourcingDemo from './components/patterns/demos/EventSourcingDemo';
import EventStreamingDemo from './components/patterns/demos/EventStreamingDemo';
import ChoreographyDemo from './components/patterns/demos/ChoreographyDemo';
import OrchestrationDemo from './components/patterns/demos/OrchestrationDemo';
import CqrsDemo from './components/patterns/demos/CqrsDemo';
import CompetingConsumersAnimation from './components/patterns/animations/CompetingConsumersAnimation';
import CompetingConsumersDemo from './components/patterns/demos/CompetingConsumersDemo';
import ExclusiveConsumerAnimation from './components/patterns/animations/ExclusiveConsumerAnimation';
import ExclusiveConsumerDemo from './components/patterns/demos/ExclusiveConsumerDemo';
import RequestReplyAnimation from './components/patterns/animations/RequestReplyAnimation';
import RequestReplyDemo from './components/patterns/demos/RequestReplyDemo';
import DeadLetterQueueAnimation from './components/patterns/animations/DeadLetterQueueAnimation';
import DeadLetterQueueDemo from './components/patterns/demos/DeadLetterQueueDemo';
import SagaAnimation from './components/patterns/animations/SagaAnimation';
import SagaDemo from './components/patterns/demos/SagaDemo';
import EventBusAnimation from './components/patterns/animations/EventBusAnimation';
import EventBusDemo from './components/patterns/demos/EventBusDemo';
import ConsumerGroupsAnimation from './components/patterns/animations/ConsumerGroupsAnimation';
import ConsumerGroupsDemo from './components/patterns/demos/ConsumerGroupsDemo';
import IdempotentReceiverAnimation from './components/patterns/animations/IdempotentReceiverAnimation';
import IdempotentReceiverDemo from './components/patterns/demos/IdempotentReceiverDemo';

export const PATTERNS: Pattern[] = [
  {
    id: 'queue',
    name: 'Message Queue',
    illustration: QueueAnimation,
    demo: QueueDemo,
    definition: 'A point-to-point communication pattern where messages are held in a queue until they are processed by a single consumer. This ensures messages are processed sequentially and decouples the producer from the consumer.',
    useCases: [
      'Task processing for background jobs (e.g., image resizing, report generation).',
      'Order processing in e-commerce systems to handle spikes in load.',
      'Decoupling microservices for improved resilience.',
    ],
    advantages: [
      'Decoupling of producer and consumer.',
      'Load balancing and smoothing of processing peaks.',
      'Guaranteed message delivery (at least once).',
      'Improved system resilience.',
    ],
    limits: [
      'Not suitable for real-time broadcast scenarios.',
      'Can become a single point of failure if the queue service goes down.',
      'Potential for increased latency.',
    ],
    prerequisites: [
      'A message broker implementation (e.g., RabbitMQ, Amazon SQS).',
      'Mechanisms for handling message acknowledgements.',
    ],
    comparison: { scalability: 4, robustness: 4, latency: 3, coupling: 1, auditability: 3, complexity: 2 },
  },
  {
    id: 'pub-sub',
    name: 'Publish/Subscribe',
    illustration: PublishSubscribeAnimation,
    demo: PublishSubscribeDemo,
    definition: 'A pattern where publishers send messages to a topic, and multiple subscribers can receive copies of that message. Publishers are not aware of the subscribers, enabling a one-to-many communication model.',
    useCases: [
      'Real-time notifications to multiple users (e.g., social media updates, news feeds).',
      'Distributing events across different microservices in an application.',
      'Live data updates in dashboards and monitoring systems.',
    ],
    advantages: [
      'Strong decoupling between publishers and subscribers.',
      'High scalability for broadcasting messages.',
      'Enables event-driven architectures.',
      'Flexibility to add new subscribers without affecting publishers.',
    ],
    limits: [
      'Message delivery is not always guaranteed (depends on broker configuration).',
      'Can be complex to manage message ordering across subscribers.',
      'Potential for message storms if not designed carefully.',
    ],
    prerequisites: [
      'A message broker that supports topics (e.g., RabbitMQ, Kafka, Google Pub/Sub).',
      'Subscribers need to manage their own subscriptions.',
    ],
    comparison: { scalability: 5, robustness: 3, latency: 2, coupling: 1, auditability: 2, complexity: 3 },
  },
   {
    id: 'broker',
    name: 'Message Broker',
    illustration: BrokerAnimation,
    demo: BrokerDemo,
    definition: 'A central intermediary software that translates messages from the formal messaging protocol of the sender to the formal messaging protocol of the receiver. It manages queues, topics, and message routing.',
    useCases: [
      'Integrating heterogeneous systems that use different protocols.',
      'Implementing reliable messaging patterns like Queues and Pub/Sub.',
      'Centralizing message routing and transformation logic.',
    ],
    advantages: [
      'Centralized management of message flow.',
      'Provides reliability, persistence, and transactional messaging.',
      'Simplifies communication between diverse applications.',
    ],
    limits: [
      'The broker itself can become a performance bottleneck or single point of failure.',
      'Adds operational overhead for maintenance and monitoring.',
      'Can introduce latency due to the extra hop.',
    ],
    prerequisites: [
      'Dedicated infrastructure for the broker software (e.g., RabbitMQ, ActiveMQ, Kafka).',
      'Network connectivity between all clients and the broker.',
    ],
    comparison: { scalability: 4, robustness: 5, latency: 3, coupling: 2, auditability: 4, complexity: 4 },
  },
  {
    id: 'event-sourcing',
    name: 'Event Sourcing',
    illustration: EventSourcingAnimation,
    demo: EventSourcingDemo,
    definition: "A pattern where all changes to an application's state are stored as a sequence of immutable events. The current state is derived by replaying these events, rather than storing the current state itself.",
    useCases: [
      'Audit-critical systems like banking and accounting.',
      'Collaborative applications where history is important (e.g., Google Docs).',
      'Systems requiring temporal queries ("What was the state at this point in time?").',
    ],
    advantages: [
      'Complete and reliable audit log of all changes.',
      'Enables powerful debugging and historical analysis.',
      'State can be reconstructed in different ways for different views (projections).',
      'Prevents data loss from concurrent updates.',
    ],
    limits: [
      'Can be complex to implement and query.',
      'Event schema evolution requires careful management.',
      'Replaying a large number of events to build state can be slow (mitigated by snapshots).',
    ],
    prerequisites: [
      'An event store (database optimized for appending events, e.g., Kafka, EventStoreDB).',
      'Logic to handle event serialization and deserialization.',
    ],
    comparison: { scalability: 4, robustness: 5, latency: 4, coupling: 2, auditability: 5, complexity: 5 },
  },
  {
    id: 'event-streaming',
    name: 'Event Streaming',
    illustration: EventStreamingAnimation,
    demo: EventStreamingDemo,
    definition: 'The practice of continuously processing a stream of events from producers. Unlike traditional messaging, streams are often durable, ordered, and replayable, enabling complex real-time analytics and processing.',
    useCases: [
      'Real-time fraud detection in financial transactions.',
      'IoT data ingestion and analysis from sensors.',
      'Clickstream analysis for user behavior tracking on websites.',
      'Change Data Capture (CDC) from databases.',
    ],
    advantages: [
      'Enables real-time data processing and analytics.',
      'Highly scalable and fault-tolerant.',
      'Durable and replayable event logs.',
      'Decouples data producers from consumers.',
    ],
    limits: [
      'High operational complexity for managing the streaming platform.',
      'Requires a different mindset compared to request/response systems.',
      'Managing state in stream processing can be challenging.',
    ],
    prerequisites: [
      'An event streaming platform (e.g., Apache Kafka, Amazon Kinesis).',
      'Stream processing frameworks (e.g., Kafka Streams, Flink, Spark Streaming).',
    ],
    comparison: { scalability: 5, robustness: 5, latency: 1, coupling: 1, auditability: 5, complexity: 5 },
  },
  {
    id: 'choreography',
    name: 'Choreography',
    illustration: ChoreographyAnimation,
    demo: ChoreographyDemo,
    definition: 'A decentralized approach where each service in a distributed system participates in a larger workflow by publishing and subscribing to events. There is no central point of control; services react to events from others.',
    useCases: [
      'Order fulfillment process where inventory, payment, and shipping services react to an "OrderPlaced" event.',
      'User signup process involving authentication, profile, and notification services.',
    ],
    advantages: [
      'High decoupling, services are autonomous.',
      'Improved resilience, as there is no single point of failure.',
      'Easy to add new services to the flow.',
    ],
    limits: [
      'Difficult to monitor and understand the end-to-end business process.',
      'Can lead to complex cyclic dependencies between services.',
      'Error handling and compensation logic are distributed and harder to implement.',
    ],
    prerequisites: [
      'A robust event bus or pub/sub mechanism.',
      'Clear contracts and documentation for events.',
    ],
    comparison: { scalability: 5, robustness: 4, latency: 2, coupling: 1, auditability: 2, complexity: 4 },
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    illustration: OrchestrationAnimation,
    demo: OrchestrationDemo,
    definition: 'A centralized approach where a single "orchestrator" service is responsible for controlling the interaction between other services to execute a business process. It explicitly dictates the workflow and calls services in sequence.',
    useCases: [
      'Complex business workflows requiring transactional guarantees (e.g., booking a trip involving flights, hotels, and car rentals).',
      'Processes with complex branching logic and error handling requirements.',
    ],
    advantages: [
      'Centralized visibility and control over the business process.',
      'Simplified error handling and transaction management (e.g., using Sagas).',
      'Easier to understand and monitor the end-to-end flow.',
    ],
    limits: [
      'The orchestrator can become a single point of failure and a bottleneck.',
      'Tighter coupling between the orchestrator and the participant services.',
      'Can lead to a "smart pipe, dumb endpoints" architecture, reducing service autonomy.',
    ],
    prerequisites: [
      'A dedicated service to act as the orchestrator.',
      'Well-defined APIs for the participant services.',
    ],
    comparison: { scalability: 3, robustness: 4, latency: 4, coupling: 4, auditability: 5, complexity: 3 },
  },
  {
    id: 'cqrs',
    name: 'CQRS',
    illustration: CqrsAnimation,
    demo: CqrsDemo,
    definition: 'Command Query Responsibility Segregation (CQRS) is a pattern that separates read and write operations for a data store. Commands update data, and Queries read data, allowing for independent scaling and optimization of read and write workloads.',
    useCases: [
      'High-performance applications where read and write patterns are very different.',
      'Complex domains where different models are needed for updating and reading.',
      'Collaborative domains where many users operate on the same data.',
      'Systems that are often combined with Event Sourcing.',
    ],
    advantages: [
      'Independent scaling of read and write workloads.',
      'Optimized data schemas for reads (queries) and writes (commands).',
      'Improved performance for both reads and writes.',
      'Enhanced security as you can separate who can issue commands vs. queries.',
    ],
    limits: [
      'Increased complexity, especially in simpler domains.',
      'Eventual consistency can be challenging for UIs and users to handle.',
      'Potential for more code duplication between write and read models.',
      'Requires a robust data synchronization mechanism.',
    ],
    prerequisites: [
      'Separate data models (and often databases) for read and write operations.',
      'A reliable mechanism to synchronize the read store from the write store.',
      'Application logic must be able to handle eventual consistency.',
    ],
    comparison: { scalability: 5, robustness: 4, latency: 3, coupling: 2, auditability: 3, complexity: 5 },
  },
  {
    id: 'competing-consumers',
    name: 'Competing Consumers',
    illustration: CompetingConsumersAnimation,
    demo: CompetingConsumersDemo,
    definition: 'Plusieurs consommateurs lisent les messages d\'une même file d\'attente, mais chaque message n\'est traité qu\'une seule fois par un seul consommateur. Ce patron est utilisé pour la montée en charge horizontale du traitement des messages.',
    useCases: [
      'Mise à l\'échelle du traitement des tâches en arrière-plan (par exemple, traitement d\'images, conversion de vidéos).',
      'Exécution parallèle de tâches pour augmenter le débit global du système.',
    ],
    advantages: [
      'Haute scalabilité et débit amélioré.',
      'Répartition de charge automatique entre les consommateurs.',
      'Résilience : si un consommateur tombe en panne, les autres continuent de traiter les messages.',
    ],
    limits: [
      'L\'ordre des messages n\'est pas garanti à travers les différents consommateurs.',
      'La gestion d\'état peut être complexe si les tâches ne sont pas indépendantes.',
    ],
    prerequisites: [
      'Un message broker qui supporte le modèle de file d\'attente (point-to-point).',
      'Des consommateurs sans état ou avec un accès à un état partagé et géré.',
    ],
    comparison: { scalability: 5, robustness: 4, latency: 3, coupling: 1, auditability: 3, complexity: 3 },
  },
  {
    id: 'exclusive-consumer',
    name: 'Exclusive Consumer',
    illustration: ExclusiveConsumerAnimation,
    demo: ExclusiveConsumerDemo,
    definition: 'Un patron où plusieurs consommateurs sont connectés à une file, mais un seul est actif à un instant T (le "leader"). Si le consommateur actif tombe en panne, un autre prend le relais, garantissant ainsi une haute disponibilité sans traitement en double.',
    useCases: [
      'Traitement de tâches critiques qui ne doivent être exécutées qu\'une seule fois.',
      'Systèmes où l\'ordre strict des messages est crucial et ne peut être parallélisé.',
    ],
    advantages: [
      'Haute disponibilité (failover).',
      'Prévient le traitement en double dans des scénarios actif-actif.',
      'Garantit le traitement séquentiel et ordonné.',
    ],
    limits: [
      'Ne permet pas la montée en charge du débit, car un seul consommateur est actif.',
      'Le basculement (failover) peut introduire une légère latence.',
    ],
    prerequisites: [
      'Un broker qui supporte les consommateurs exclusifs ou une logique de leader election côté client.',
    ],
    comparison: { scalability: 2, robustness: 5, latency: 3, coupling: 2, auditability: 4, complexity: 4 },
  },
  {
    id: 'request-reply',
    name: 'Request-Reply',
    illustration: RequestReplyAnimation,
    demo: RequestReplyDemo,
    definition: 'Permet une communication de type synchrone sur une infrastructure asynchrone. Un demandeur envoie un message avec une adresse de réponse et un ID de corrélation, et attend une réponse sur une file dédiée.',
    useCases: [
      'Appels de type RPC (Remote Procedure Call) sur un bus de messages.',
      'Découplage du cycle de vie de la requête et de la réponse dans les microservices.',
    ],
    advantages: [
      'Découple le client du service ; le client n\'est pas bloqué en attente.',
      'Plus résilient qu\'un appel HTTP synchrone direct.',
      'Permet au service de traiter les requêtes à son propre rythme.',
    ],
    limits: [
      'Plus complexe à mettre en œuvre qu\'un appel synchrone classique.',
      'Nécessite une gestion rigoureuse des ID de corrélation et des timeouts.',
    ],
    prerequisites: [
      'Deux files d\'attente (requête et réponse).',
      'Un mécanisme pour corréler les réponses aux requêtes.',
    ],
    comparison: { scalability: 4, robustness: 4, latency: 3, coupling: 3, auditability: 4, complexity: 4 },
  },
  {
    id: 'dead-letter-queue',
    name: 'Dead-Letter Queue',
    illustration: DeadLetterQueueAnimation,
    demo: DeadLetterQueueDemo,
    definition: 'Une file d\'attente spécialisée pour recevoir les messages qui n\'ont pas pu être traités avec succès après plusieurs tentatives. Cela évite que des "messages empoisonnés" ne bloquent le système.',
    useCases: [
      'Isoler les messages malformés ou problématiques.',
      'Analyser les échecs de traitement pour le débogage.',
      'Mettre en place des alertes pour les messages non traitables.',
    ],
    advantages: [
      'Améliore considérablement la robustesse du système.',
      'Empêche le blocage des files d\'attente principales.',
      'Permet une analyse post-mortem des messages en échec.',
    ],
    limits: [
      'Nécessite une surveillance et un processus clair pour gérer les messages dans la DLQ.',
      'Ne résout pas la cause de l\'échec du message.',
    ],
    prerequisites: [
      'Un broker qui supporte nativement les DLQ ou une implémentation personnalisée.',
    ],
    comparison: { scalability: 3, robustness: 5, latency: 4, coupling: 2, auditability: 5, complexity: 3 },
  },
  {
    id: 'saga',
    name: 'Saga Pattern',
    illustration: SagaAnimation,
    demo: SagaDemo,
    definition: 'Gère les transactions distribuées à longue durée via une séquence de transactions locales. Chaque transaction publie un événement qui déclenche la suivante. En cas d\'échec, des transactions de compensation sont exécutées pour annuler les étapes précédentes.',
    useCases: [
      'Transactions distribuées dans les microservices (ex: réservation de voyage, commande e-commerce).',
      'Processus métier impliquant plusieurs services qui ne peuvent pas être verrouillés par une transaction unique.',
    ],
    advantages: [
      'Maintient la cohérence des données entre les services sans utiliser de protocole 2PC bloquant.',
      'Les services restent faiblement couplés.',
    ],
    limits: [
      'Complexe à concevoir et à déboguer.',
      'La logique de compensation doit être implémentée avec soin pour chaque étape.',
      'La cohérence est éventuelle (eventual consistency).',
    ],
    prerequisites: [
      'Un bus d\'événements fiable.',
      'Des contrats clairs pour les événements et les actions de compensation.',
    ],
    comparison: { scalability: 4, robustness: 5, latency: 4, coupling: 2, auditability: 5, complexity: 5 },
  },
  {
    id: 'event-bus',
    name: 'Event Bus',
    illustration: EventBusAnimation,
    demo: EventBusDemo,
    definition: 'Un canal de communication centralisé qui permet à différents composants de publier et de souscrire à des événements sans se connaître mutuellement. Il facilite une architecture découplée et réactive.',
    useCases: [
      'Notifications à l\'échelle de l\'application (ex: "UtilisateurConnecté").',
      'Découplage des modules au sein d\'une application monolithique.',
      'Communication inter-services de base dans une architecture microservices.',
    ],
    advantages: [
      'Très faible couplage entre les composants.',
      'Simplifie l\'ajout de nouveaux auditeurs d\'événements.',
      'Centralise le flux d\'événements pour une meilleure visibilité.',
    ],
    limits: [
      'Peut devenir un point de défaillance unique (Single Point of Failure).',
      'Le suivi du flux complet d\'une interaction peut être difficile sans outillage adéquat.',
    ],
    prerequisites: [
      'Une implémentation de bus d\'événements (en mémoire ou distribuée).',
    ],
    comparison: { scalability: 4, robustness: 3, latency: 2, coupling: 1, auditability: 3, complexity: 3 },
  },
  {
    id: 'consumer-groups',
    name: 'Consumer Groups',
    illustration: ConsumerGroupsAnimation,
    demo: ConsumerGroupsDemo,
    definition: 'Permet à un groupe de consommateurs de collaborer pour consommer les messages d\'un topic. Au sein d\'un groupe, la charge est répartie (comme une file), mais chaque groupe reçoit tous les messages (comme un pub/sub).',
    useCases: [
      'Mise à l\'échelle de la consommation de messages sur des plateformes de streaming comme Kafka.',
      'Permettre à différents systèmes (ex: analyse, archivage) de consommer le même flux de données indépendamment.',
    ],
    advantages: [
      'Très haute scalabilité et débit.',
      'Combine le comportement de file d\'attente (au sein d\'un groupe) et de pub/sub (entre les groupes).',
      'Rééquilibrage automatique des partitions si un consommateur est ajouté ou supprimé.',
    ],
    limits: [
      'Complexité de la gestion des partitions et du rééquilibrage des consommateurs.',
      'L\'ordre n\'est garanti qu\'au sein d\'une partition, pas sur l\'ensemble du topic.',
    ],
    prerequisites: [
      'Une plateforme de streaming qui supporte les groupes de consommateurs (ex: Apache Kafka).',
    ],
    comparison: { scalability: 5, robustness: 5, latency: 2, coupling: 1, auditability: 4, complexity: 4 },
  },
  {
    id: 'idempotent-receiver',
    name: 'Idempotent Receiver',
    illustration: IdempotentReceiverAnimation,
    demo: IdempotentReceiverDemo,
    definition: 'Un patron où un consommateur est conçu pour que le traitement répété du même message produise le même résultat que s\'il n\'avait été traité qu\'une seule fois. Cela évite les erreurs dues aux messages en double.',
    useCases: [
      'Systèmes avec une garantie de livraison "au moins une fois" (at-least-once).',
      'Traitement des paiements, soumission de commandes, ou toute opération qui ne doit pas être dupliquée.',
    ],
    advantages: [
      'Augmente la robustesse et la fiabilité du système.',
      'Prévient la corruption des données ou les effets de bord indésirables.',
    ],
    limits: [
      'Ajoute une surcharge pour suivre les ID des messages déjà traités.',
      'Nécessite une implémentation rigoureuse et un stockage pour les ID.',
    ],
    prerequisites: [
      'Un moyen d\'identifier de manière unique chaque message (ex: ID de message).',
      'Un stockage persistant pour les ID des messages traités (ex: base de données, cache).',
    ],
    comparison: { scalability: 4, robustness: 5, latency: 3, coupling: 2, auditability: 4, complexity: 4 },
  },
];

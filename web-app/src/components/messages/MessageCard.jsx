import React, { useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions,
  Badge, 
  Typography, 
  Box, 
  Chip,
  Avatar,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Person, 
  Group, 
  MeetingRoom, 
  Sports, 
  EmojiEvents, 
  SupervisorAccount,
  Public,
  MarkEmailRead,
  Delete,
  Reply,
  Campaign
} from '@mui/icons-material';

/**
 * Carte affichant un message dans la boîte de réception ou la boîte d'envoi
 * Amélioré pour montrer clairement le type de message (individuel, groupe, diffusion)
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.message - Les données du message à afficher
 * @param {boolean} props.isInbox - Indique si le message est dans la boîte de réception (true) ou d'envoi (false)
 * @param {Function} props.onMarkAsRead - Fonction à appeler pour marquer un message comme lu
 * @param {Function} props.onDelete - Fonction à appeler pour supprimer un message
 * @param {Function} props.onReply - Fonction à appeler pour répondre à un message
 */
const MessageCard = ({ 
  message, 
  isInbox = true,
  onMarkAsRead,
  onDelete,
  onReply
}) => {
  const router = useRouter();
  
  // Détermine l'icône à afficher en fonction de la catégorie de destinataire
  const getCategoryIcon = () => {
    switch (message.recipientCategory) {
      case 'INDIVIDUAL':
        return <Person />;
      case 'TEAM':
        return <Group />;
      case 'TEAM_WITH_COACH':
        return <MeetingRoom />;
      case 'ALL_PLAYERS':
        return <Sports />;
      case 'ALL_COACHES':
        return <SupervisorAccount />;
      case 'COMPETITION_COACHES':
        return <EmojiEvents />;
      case 'GLOBAL':
        return <Public />;
      default:
        return <Person />;
    }
  };
  
  // Retourne un libellé pour la catégorie de destinataire
  const getCategoryLabel = () => {
    switch (message.recipientCategory) {
      case 'INDIVIDUAL':
        return 'Message individuel';
      case 'TEAM':
        return 'Équipe';
      case 'TEAM_WITH_COACH':
        return 'Équipe et coach';
      case 'ALL_PLAYERS':
        return 'Tous les joueurs';
      case 'ALL_COACHES':
        return 'Tous les coachs';
      case 'ALL_ORGANIZERS':
        return 'Tous les organisateurs';
      case 'COMPETITION_COACHES':
        return 'Coachs de compétition';
      case 'GLOBAL':
        return 'Message global';
      default:
        return 'Message';
    }
  };
  
  // Formatter les dates en français
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
  };
  
  // Détermine la couleur du badge en fonction du rôle de l'expéditeur/destinataire
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'PLAYER':
        return 'primary';
      case 'COACH':
        return 'success';
      case 'ORGANIZER':
        return 'warning';
      case 'ADMIN':
        return 'error';
      case 'SYSTEM':
        return 'info';
      default:
        return 'default';
    }
  };
  
  // Affiche le nom du rôle en français
  const getRoleLabel = (role) => {
    switch (role) {
      case 'PLAYER':
        return 'Joueur';
      case 'COACH':
        return 'Coach';
      case 'ORGANIZER':
        return 'Organisateur';
      case 'ADMIN':
        return 'Administrateur';
    //   case 'SYSTEM':
    //     return 'Système';
      default:
        return role;
    }
  };
  
  // Vérifier si c'est un message de diffusion
  const isBroadcastMessage = () => {
    return ['ALL_PLAYERS', 'ALL_COACHES', 'ALL_ORGANIZERS', 'COMPETITION_COACHES', 'GLOBAL'].includes(message.recipientCategory);
  };
  
  // Obtenir l'info du type de message pour l'affichage
  const getMessageTypeInfo = () => {
    // Message du système ou d'administrateur
    if (message.senderRole === 'ADMIN' || message.senderRole === 'SYSTEM') {
      return {
        icon: <Campaign fontSize="small" />,
        label: 'Système',
        color: 'info'
      };
    }
    
    // Message individuel
    if (message.recipientCategory === 'INDIVIDUAL') {
      return {
        icon: <Person fontSize="small" />,
        label: 'Individuel',
        color: 'primary'
      };
    }
    
    // Message d'équipe
    if (['TEAM', 'TEAM_WITH_COACH'].includes(message.recipientCategory)) {
      return {
        icon: <Group fontSize="small" />,
        label: 'Équipe',
        color: 'success'
      };
    }
    
    // Message de diffusion
    if (isBroadcastMessage()) {
      return {
        icon: <Campaign fontSize="small" />,
        label: 'Diffusion',
        color: 'warning'
      };
    }
    
    // Par défaut
    return {
      icon: <Person fontSize="small" />,
      label: 'Message',
      color: 'default'
    };
  };
  
  const messageTypeInfo = getMessageTypeInfo();
  
  // Gestion des actions - Optimisées avec useCallback
  const handleMarkAsRead = useCallback((e) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(message.id);
    }
  }, [message.id, onMarkAsRead]);
  
  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(message.id);
    }
  }, [message.id, onDelete]);
  
  const handleReply = useCallback((e) => {
    e.stopPropagation();
    if (onReply) {
      onReply(message);
    }
  }, [message, onReply]);
  
  // Naviguer vers la vue détaillée du message
  const navigateToDetail = useCallback(() => {
    router.push(`/dashboard/messages/${message.id}`);
  }, [router, message.id]);
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        },
        bgcolor: isInbox && !message.isRead ? 'action.hover' : 'background.paper'
      }}
      onClick={navigateToDetail}
    >
      <CardHeader
        avatar={
          <Avatar>
            {isInbox 
              ? message.senderName?.charAt(0).toUpperCase() || 'U'
              : message.recipientCategory === 'INDIVIDUAL' && message.recipientName
                ? message.recipientName.charAt(0).toUpperCase()
                : getCategoryIcon()
            }
          </Avatar>
        }
        title={
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography variant="subtitle1" fontWeight={!message.isRead && isInbox ? 'bold' : 'normal'}>
              {isInbox ? message.senderName || 'Utilisateur' : getCategoryLabel()}
            </Typography>
            
            {/* Affichage du rôle */}
            <Chip 
              size="small" 
              label={isInbox ? getRoleLabel(message.senderRole) : ''} 
              color={isInbox ? getRoleBadgeColor(message.senderRole) : 'default'}
              sx={{ height: 20 }}
            />
            
            {/* Nouveau : Affichage du type de message */}
            <Chip
              size="small"
              icon={messageTypeInfo.icon}
              label={messageTypeInfo.label}
              color={messageTypeInfo.color}
              variant="outlined"
              sx={{ height: 20 }}
            />
            
            {!message.isRead && isInbox && (
              <Badge color="primary" variant="dot" sx={{ ml: 1 }} />
            )}
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="caption" color="text.secondary">
              {formatDate(message.sentAt)}
            </Typography>
            
            {/* Afficher le contexte pour les messages de diffusion */}
            {isBroadcastMessage() && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic', mt: 0.5 }}>
                {getCategoryLabel()} 
                {message.relatedEntityName && ` - ${message.relatedEntityName}`}
              </Typography>
            )}
          </Box>
        }
        action={
          message.relatedEntityType && (
            <Tooltip title={`Relatif à: ${message.relatedEntityType}`}>
              <Chip 
                size="small" 
                label={message.relatedEntityType} 
                variant="outlined"
                color="info"
              />
            </Tooltip>
          )
        }
      />
      
      <CardContent sx={{ py: 1 }}>
        <Typography variant="body2" sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {message.content}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        alignItems: 'center',
        p: 1
      }}>
        {isInbox && !message.isRead && (
          <Tooltip title="Marquer comme lu">
            <IconButton size="small" onClick={handleMarkAsRead} color="primary">
              <MarkEmailRead />
            </IconButton>
          </Tooltip>
        )}
        
        {isInbox && (
          <Tooltip title="Répondre">
            <IconButton size="small" onClick={handleReply} color="primary">
              <Reply />
            </IconButton>
          </Tooltip>
        )}
        
        <Tooltip title="Supprimer">
          <IconButton size="small" onClick={handleDelete} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

// Utilisation de React.memo pour éviter les re-rendus inutiles
// avec une fonction de comparaison personnalisée pour optimiser davantage
function areEqual(prevProps, nextProps) {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.isRead === nextProps.message.isRead &&
    prevProps.isInbox === nextProps.isInbox
  );
}

export default memo(MessageCard, areEqual);
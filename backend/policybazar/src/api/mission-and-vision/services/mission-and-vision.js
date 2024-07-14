'use strict';

/**
 * mission-and-vision service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mission-and-vision.mission-and-vision');

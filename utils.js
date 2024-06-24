function isLocationValid(x, y, width = 1, height = 1) {
    for (let i = Math.max(0, x - MIN_DISTANCE); i < Math.min(MAP_SIZE, x + width + MIN_DISTANCE); i++) {
        for (let j = Math.max(0, y - MIN_DISTANCE); j < Math.min(MAP_SIZE, y + height + MIN_DISTANCE); j++) {
            if (map[i][j] !== EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function extendRoad(x, y, direction) {
    if (direction === 'up') {
        for (let i = x - 1; i >= 0; i--) {
            if (map[i][y] !== EMPTY) break;
            map[i][y] = 'vertical_road';
        }
    } else if (direction === 'down') {
        for (let i = x + 1; i < MAP_SIZE; i++) {
            if (map[i][y] !== EMPTY) break;
            map[i][y] = 'vertical_road';
        }
    } else if (direction === 'left') {
        for (let j = y - 1; j >= 0; j--) {
            if (map[x][j] !== EMPTY) break;
            map[x][j] = 'horizontal_road';
        }
    } else if (direction === 'right') {
        for (let j = y + 1; j < MAP_SIZE; j++) {
            if (map[x][j] !== EMPTY) break;
            map[x][j] = 'horizontal_road';
        }
    }
}

function isLocationValidForBuilding(x, y, width, height) {
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            if (i >= 0 && i < MAP_SIZE && j >= 0 && j < MAP_SIZE) {
                if (map[i][j] !== EMPTY) {
                    return false;
                }
            }
        }
    }
    let roadFound = false;
    for (let i = Math.max(0, x - 1); i < Math.min(MAP_SIZE, x + width + 1); i++) {
        for (let j = Math.max(0, y - 1); j < Math.min(MAP_SIZE, y + height + 1); j++) {
            if (['vertical_road', 'horizontal_road', CROSSROAD, 'tjunction_up', 'tjunction_down', 'tjunction_left', 'tjunction_right', 'turn_right_up', 'turn_left_up', 'turn_right_down', 'turn_left_down'].includes(map[i][j])) {
                roadFound = true;
            }
            if (i in Array.from({ length: width }, (_, k) => x + k) && j in Array.from({ length: height }, (_, k) => y + k)) continue;
            if (Object.keys(BUILDING_SIZES).includes(map[i][j])) {
                return false;
            }
        }
    }
    return roadFound;
}
